/**
 * @class
 * @type {*}
 */
Soshace.Response = Soshace.extend({
    /**
     * @constructor
     * @param routParams
     * @param response
     */
    init: function(routParams, response){
        console.log('Soshace.Template.instance(routParams.template).getContent()', Soshace.Template.instance(routParams.template).getContent());
        response.writeHead(200, {"Content-Type": 'text/html'});
        response.write(Soshace.Template.instance(routParams.template).getContent());
        response.end();
    }
})
