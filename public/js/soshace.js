/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

/**
 * Глобальный класс Soshace
 * @type {*}
 */
Soshace = function(){};


// Метод создания нового экземпляра.
function instance(){
    initializing = true;
    var instance = new this();
    initializing = false;
    if (typeof instance.init === 'function') {
        instance.init.apply(instance, arguments);
    }
    return instance;
}
Soshace.instance = instance;

// Create a new Class that inherits from this class
Soshace.extend = function(prop) {
    var _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;

    // Copy the properties over onto the new prototype
    for (var name in prop) {
        // Check if we're overwriting an existing function
        prototype[name] = typeof prop[name] === "function" &&
            typeof _super[name] === "function" && fnTest.test(prop[name]) ?
            (function(name, fn){
                return function() {
                    var tmp = this._super;

                    // Add a new ._super() method that is the same method
                    // but on the super-class
                    this._super = _super[name];

                    // The method only need to be bound temporarily, so we
                    // remove it when we're done executing
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;

                    return ret;
                };
            })(name, prop[name]) :
            prop[name];
    }

    // The dummy class constructor
    function Soshace() {
        // All construction is actually done in the init method
        if (!initializing && typeof this.init === 'function') {
            this.init.apply(this, arguments);
        }
    }

    // Populate our constructed prototype object
    Soshace.prototype = prototype;

    // Enforce the constructor to be what we expect
    Soshace.prototype.constructor = Soshace;

    // And make this class extendable
    Soshace.extend = arguments.callee;

    // Добавление статического метода instance.
    // Теперь экземпляры можно создавать не только при помощи ключевого
    // слова new, но и при помощи метода create. Этот метод принимает
    // параметры конструктора.
    Soshace.instance = instance;

    return Soshace;
};