var path = require('path');
var webpack = require('webpack');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
new webpack.ExtendedAPIPlugin();

function root(p) {
    return path.join(__workDir, p);
}

module.exports = {
    output: {
        path: path.join(__workDir, './crodova/platforms/browser/www/'),
        chunkFilename: 'bundle-[chunkhash].js'
    },

    cache: true,
    performance: { hints: false },

    // TODO: eval on fast develop
    // devtool: __devTool | 'source-map',
    devtool: 'source-map',

    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.less'],
    },

    entry: {
        app: [
            path.join(__workDir, './src/A_Web.ts'), // Your appʼs entry point
            'webpack-dev-server/client?http://localhost:8090/', // WebpackDevServer host and port
            'webpack/hot/only-dev-server' // "only" prevents reload on syntax errors
        ]
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                include: [
                    path.join(__workDir, './src/')
                ],
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
                loader: 'url-loader?limit=10000&name=assets/[name]-[hash].[ext]',
                include: [
                    path.join(__workDir, './src/')
                ]
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.FABALOUS_CORDOVA': '"true"',
            'process.env.FABALOUS_DEBUG': '"true"'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'app',
            minChunks: Infinity,
            minChunkSize: 50000,
            filename: 'app.js'
        }),
        new ProgressBarPlugin(),
        new HtmlWebpackPlugin({
            hash:true,
            template: path.join(__workDir, './src/common/web/index.ejs')
        }),
        new webpack.NamedModulesPlugin()
    ]
};