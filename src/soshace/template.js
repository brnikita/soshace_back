var fs = require('fs'),
    jade = require('jade'),
    templatesDir = '../soshace/templates/',
    templates = fs.readdirSync(templatesDir),
    templatesContent = {};

for(var i = 0; i < templates.length; i++){
    templatesContent[templates[i].replace(/\.jade/, '')] = jade.compile(fs.readFileSync(templatesDir + templates[i]));
}

/**
 * @class
 * @type {*}
 */
Soshace.Template = Soshace.extend({
    /**
     * Переменные шаблона
     */
    local: null,
    /**
     * Имя шаблона
     */
    template: null,
    /**
     * @constructor
     * @param template
     * @param local {Object}
     */
    init: function(template, local){
            this.template = template;
            this.local = local;
    },
    /**
     * @function
     * @returns {String}
     */
    templateRender: function(){
        if(templatesContent.hasOwnProperty(this.template)){
            return templatesContent[this.template](this.local);
        }else{
            return '<h1>Template not exist!</h1>';
        }
    }
});
