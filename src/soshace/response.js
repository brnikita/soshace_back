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
    responseBody: null,
    /**
     * Данные о роуте(язык, страна, город, шаблон ...)
     */
    routData: null,
    /**
     * @constructor
     * @param request
     * @param response
     * @param db Экземпляр класса Soshace.Db
     */
    init: function(request, response, db){
        this.response = response;
        this.routData = Soshace.Router.instance(request).getData();
        this.responseBody = Soshace.Actions[this.routData.action].instance(this.routData.parsedRout, db).start();
    },
    /**
     * Метод отправки ответа сервера
     * @function
     */
    send: function(){
        this.response.writeHead(200, {"Content-Type": 'text/html'});
        this.response.write(this.responseBody);
        this.response.end();
    }
})
