var /**
     * Модуль http
     */
        http = require('http');

/**
 * Класс Сервера http
 * @Class
 * @type {*}
 */

Soshace.Server = Soshace.extend({
    /**
     * Порт, который слушает наш сервер
     * @type {Number}
     */
    port: 8080,
    /**
     * Конструктор сервера
     * @constructor
     * @param port {Number}
     * @param callback {Function}
     */
    init: function(port, callback){
        var _this = this;
        _this.port = port;
        http.createServer(function(request, response){
            callback(request, response);
        }).listen(_this.port, function(){
                console.log('Server start listening on port ', _this.port);
            });
    }
});