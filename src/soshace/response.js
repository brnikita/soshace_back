/**
 * @class
 * @type {*}
 */
Soshace.Response = Soshace.extend({
    /**
     * Объект ответа сервера
     */
    response: null,
    /**
     * Тело ответа
     */
    sendBody: null,
    /**
     * Данные о роуте(язык, страна, город, шаблон ...)
     */
    routParams: null,
    /**
     * @constructor
     * @param request
     * @param response
     */
    init: function(request, response){
        this.response = response;
        this.routParams = Soshace.Router.instance(request).parseRout();
        this.sendBody = Soshace.Template.instance(this.routParams.template, this.routParams).templateRender();
    },
    /**
     * Метод отправки ответа сервера
     * @function
     */
    send: function(){
        this.response.writeHead(200, {"Content-Type": 'text/html'});
        this.response.write(this.sendBody);
        this.response.end();
    }
})
