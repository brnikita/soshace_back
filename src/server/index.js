Soshace.Server = Soshace.extend({
    /**
     * Модуль http
     */
    http: require('http'),
    /**
     * Модуль url
     */
    url: require('url'),
    /**
     * Роуты
     */
    routs: {},
    /**
     * Метод добавления новых роутов
     * @param newRouts
     */
    addRouts: function(newRouts){
        this.core.extend(this.routs, newRouts);
        return this;
    },
    /**
     * Запускаем сервер
     */
    start: function(){
        var _this = this;
        this.http.createServer(function(request, response){
            var pathName = _this.url.parse(request.url).pathname;
            _this.routs[pathName](request, function(data){
                response.writeHead(data.statusCode, {"Content-Type": data.contentType});
                response.write(data.body);
                response.end();
            });
        }).listen(80);
        return _this;
    }
});
