var url = require('url');

Soshace.Router = Soshace.extend({
    /**
     * Основные разделы сайта
     */
    tabs: ['events', 'places', 'q&a'],
    /**
     * Поддерживаемые языки
     */
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
        if(/^\/?$/.test(this.rout)) {
            this.data.action = 'Posts';
            return this.data;
        }

        //url: add-post
        if(/^\/add-post\/?$/.test(this.rout)) {
            this.data.action = 'AddPost';
            return this.data;
        }

        // Пример: /ru
        if((new RegExp('^\/(?:' + this.languages.join('|') + ')\/?$')).test(this.rout)){
            params = this.rout.match(/^\/(\w+)\/?$/);
            this.data.action = 'Posts';
            this.data.parsedRout.language = params[1];
            return this.data
        }

        // Пример: /ru/events
        if((new RegExp('^\/(?:' + this.languages.join('|') + ')\/(?:' + this.tabs.join('|') + ')\/?$')).test(this.rout)){
            params = this.rout.match(/^\/(\w+)\/(\w+)\/?$/);
            this.data.action = 'Posts';
            this.data.parsedRout.language = params[1];
            this.data.parsedRout.category = params[2];
            return this.data
        }

        // Пример: /ru/russia
        if((new RegExp('^\/(?:' + this.languages.join('|') + ')\/\\w+\/?$')).test(this.rout)){
            params = this.rout.match(/^\/(\w+)\/(\w+)\/?$/);
            this.data.action = 'Posts';
            this.data.parsedRout.language = params[1];
            this.data.parsedRout.country = params[2];
            return this.data
        }

        // Пример: /ru/russia/events
        if((new RegExp('^\/(?:' + this.languages.join('|') + ')\/\\w+\/(?:' + this.tabs.join('|') + ')\/?$')).test(this.rout)){
            params = this.rout.match(/^\/(\w+)\/(\w+)\/(\w+)\/?$/);
            this.data.action = 'Posts';
            this.data.parsedRout.language = params[1];
            this.data.parsedRout.country = params[2];
            this.data.parsedRout.category = params[3];
            return this.data
        }

        // Пример: /ru/russia/msk
        if((new RegExp('^\/(?:' + this.languages.join('|') + ')\/\\w+\/\\w+\/?$')).test(this.rout)){
            params = this.rout.match(/^\/(\w+)\/(\w+)\/(\w+)\/?$/);
            this.data.action = 'Posts';
            this.data.parsedRout.language = params[1];
            this.data.parsedRout.country = params[2];
            this.data.parsedRout.city = params[3];
            return this.data
        }

        // Пример: /ru/russia/msk/events
        if((new RegExp('^\/(?:' + this.languages.join('|') + ')\/\\w+\/\\w+\/(?:' + this.tabs.join('|') + ')\/?$')).test(this.rout)){
            params = this.rout.match(/^\/(\w+)\/(\w+)\/(\w+)\/(\w+)\/?$/);
            this.data.action = 'Posts';
            this.data.parsedRout.language = params[1];
            this.data.parsedRout.country = params[2];
            this.data.parsedRout.city = params[3];
            this.data.parsedRout.category = params[4];
            return this.data
        }

        this.data.parsedRout.badRout = true;
        return this.data
        
    }

});