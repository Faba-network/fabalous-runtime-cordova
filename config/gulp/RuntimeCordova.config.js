module.exports = function (gulp){
    var webpack = require('webpack');
    var WebpackDevServer = require("webpack-dev-server");
    var path = require('path');
    var CompressionPlugin = require('compression-webpack-plugin');
    var HtmlWebpackPlugin = require('html-webpack-plugin');

    var developConfig = require("./../webpack/WebpackCordova.config.js");

    gulp.task('runtime-cordova-watch', function() {
        new WebpackDevServer(webpack(developConfig), {
            publicPath: '/',
            contentBase: path.join(__workDir, './.cordova/platforms/browser/www/'),
            hot: true,
            stats: {
                colors: true,
                chunks:false,
                assets:true,
                modules:false,
                version:true,
                errors:true
            }
        }).listen(8090, 'localhost', function(err) {
            if (err) console.error(err);
        });
    });

    gulp.task('runtime-cordova-build', function(done) {
        var myConfig = developConfig;

        myConfig.entry = {
            app: [
                path.join(__workDir, './src/A_Web.ts')
            ]
        };

        myConfig.devtool = false;

        myConfig.plugins = [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV':  JSON.stringify("production"),
                'process.env.FABALOUS_RUNTIME': JSON.stringify("cordova"),
                'process.env.FABALOUS_DEBUG': JSON.stringify(1),
                'process.env.API_URL': JSON.stringify(process.env.API_URL),
                'process.env.GOOGLE_ANALYTICS': JSON.stringify(process.env.GOOGLE_ANALYTICS)
            }),
            new webpack.optimize.ModuleConcatenationPlugin(),

            new HtmlWebpackPlugin({
                hash:true,
                template: getIndexFile(),
                chunksSortMode:"none"
            }),

            new CompressionPlugin(),
            new webpack.ExtendedAPIPlugin()
        ];

        webpack(myConfig).run(onBuild(done));
    });

    function onBuild(done) {
        return function(err, stats) {
            gulp.src(__workDir+"/src/manifest.json")
                .pipe(gulp.dest(__workDir+"/dist/cordova/"));

            if(err)console.error('Error', err);
            else console.log(stats.toString());
            if(done) done();
        }
    }

    gulp.task('cordova-create', function() {
        var cordova = require('cordova-lib').cordova.raw;
        return cordova.create('.cordova', "de.test.Jey", "jey");
    });

    gulp.task('cordova-add-ios', function() {
        var cordova = require('cordova-lib').cordova.raw;
        process.chdir('.cordova');
        return cordova.platform("add","ios");
    });

    gulp.task('cordova-add-android', function() {
        var cordova = require('cordova-lib').cordova.raw;
        process.chdir('.cordova');
        return cordova.platform("add","android");
    });

    gulp.task('cordova-build-ios', function() {
        var cordova = require('cordova-lib').cordova.raw;
        process.chdir('.cordova');
        return cordova.build("ios");
    });

    gulp.task('cordova-run-ios', function() {
        var cordova = require('cordova-lib').cordova.raw;
        process.chdir('.cordova');
        return cordova.run("ios");
    });
};