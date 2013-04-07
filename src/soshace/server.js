var /**
     * Модуль http
     */
        http = require('http'),
    /**
     * Модуль url
     */
        url = require('url'),
    /**
     * Порт, который слушает наш сервер
     */
    port = 80;


/**
 * Объект Сервера http
 * @type {*}
 */

Soshace.Server = {
    /**
     * Запускаем сервер
     */
    start: function(){
        var _this = this;
        http.createServer(function(request, response){
            _this.on(request, response);
        }).listen(port, function(){
                console.log('Server start listening on port ', port);
            });
    },
    on: function(request, response){
        var pathName = url.parse(request.url).pathname;
        console.log(pathName);
//        this.routs[pathName](request, function(data){
//            response.writeHead(data.statusCode, {"Content-Type": data.contentType});
//            response.write(data.body);
//            response.end();
//        });
    }
};