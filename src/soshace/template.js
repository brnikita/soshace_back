var fs = require('fs'),
    jade = require('jade'),
    templatesDir = '../soshace/templates/',
    templates = fs.readdirSync(templatesDir),
    templatesContent = {};

for(var i = 0; i < templates.length; i++){
    templatesContent[templates[i].replace(/\.jade/, '')] = jade.compile(fs.readFileSync(templatesDir + templates[i]))({title: 'Hello'});
}

/**
 * @class
 * @type {*}
 */
Soshace.Template = Soshace.extend({
    content: null,
    /**
     * @constructor
     * @param template
     */
    init: function(template){
        if(templatesContent.hasOwnProperty(template)){
            this.content = templatesContent[template];
        }
    },
    /**
     * @function
     * @returns {null}
     */
    getContent: function(){
        return this.content;
    }
});
