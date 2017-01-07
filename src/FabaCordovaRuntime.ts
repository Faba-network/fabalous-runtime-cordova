import FabaCore from "@fabalous/core/FabaCore";
import FabaStore from "@fabalous/core/FabaStore";
class FabaCordovaRuntime extends FabaCore{
    constructor(){
        super(new FabaStore<{}>({}));
    }
}