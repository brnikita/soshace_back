var url = require('url');

Soshace.Router = Soshace.extend({
    languages:['ru', 'en'],
    /**
     * Относительный URL
     */
    rout: '',
    /**
     * Данные полученные из запроса
     */
    data: {
        action: '',
        parsedRout: {}
    },
    /**
     * @constructor
     * @param request
     */
    init:function(request){
        this.rout = url.parse(request.url).pathname;
    },
    /**
     * Метод, который парсит URL
     * @function
     */
    getData: function(){
        var params = [];
        if(this.rout === '') {
            this.data.parsedRout.badRout = true;
            return this.data;
        }

        // Язык. Пример: /ru
        if((new RegExp('^\/(?:' + this.languages.join('|') + ')\/?$')).test(this.rout)){
            params = this.rout.match(/^\/(\w+)\/?$/);
            this.data.action = 'Posts';
            this.data.parsedRout.language = params[1];
            return this.data
        }

        // Язык > раздел. Пример: /ru/events
        if((new RegExp('^\/(?:' + this.languages.join('|') + ')\/\\w+\/?$')).test(this.rout)){
            params = this.rout.match(/^\/(\w+)\/(\w+)\/?$/);
            this.data.action = 'Posts';
            this.data.parsedRout.language = params[1];
            this.data.parsedRout.category = params[2];
            return this.data
        }

        // Язык > раздел > id поста. Пример: /ru/events/123
        if((new RegExp('^\/(?:' + this.languages.join('|') + ')\/\\w+\/[0-9]+\/?$')).test(this.rout)){
            params = this.rout.match(/^\/(\w+)\/(\w+)\/([0-9]+)\/?$/);
            this.data.parsedRout.action = 'Posts';
            this.data.parsedRout.language = params[1];
            this.data.parsedRout.category = params[2];
            this.data.parsedRout.postId = params[3];
            return this.data
        }

        this.data.parsedRout.badRout = true;
        return this.data
    }

});