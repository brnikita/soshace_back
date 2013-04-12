var url = require('url');

Soshace.Router = Soshace.extend({
    languages:['ru', 'en'],
    /**
     * Относительный URL
     */
    rout: '',
    /**
     * Распарсенный URL
     */
    routParams: null,
    /**
     * @constructor
     * @param request
     */
    init:function(request){
        this.rout = url.parse(request.url).pathname;
        this.routParams = {
            template:'',
            language: '',
            country: '',
            city: '',
            category:'',
            subcategory:'',
            postId:'',
            badRout: false
        };
    },
    /**
     * Метод, который парсит URL
     * @function
     */
    parseRout: function(){
        var params = [];
        if(this.rout === '') {
            this.routParams.badRout = true;
            return this.routParams;
        }

        // Пример: /ru
        if((new RegExp('^\/(?:' + this.languages.join('|') + ')\/?$')).test(this.rout)){
            params = this.rout.match(/^\/(\w+)\/?$/);
            this.routParams.template = 'posts';
            this.routParams.language = params[1];
            return this.routParams;
        }

        // Пример: /ru/events
        if((new RegExp('^\/(?:' + this.languages.join('|') + ')\/(?:events|places|persons)\/?$')).test(this.rout)){
            params = this.rout.match(/^\/(\w+)\/(events|places|persons)\/?$/);
            this.routParams.template = 'posts';
            this.routParams.language = params[1];
            this.routParams.category = params[2];
            return this.routParams;
        }

        // Пример: /ru/russia
        if((new RegExp('^\/(?:' + this.languages.join('|') + ')\/\\w+\/?$')).test(this.rout)){
            params = this.rout.match(/^\/(\w+)\/(\w+)\/?$/);
            this.routParams.template = 'posts';
            this.routParams.language = params[1];
            this.routParams.country = params[2];
            return this.routParams;
        }

        // Пример: /ru/russia/events
        if((new RegExp('^\/(?:' + this.languages.join('|') + ')\/\\w+\/(?:events|places|persons)\/?$')).test(this.rout)){
            params = this.rout.match(/^\/(\w+)\/(\w+)\/(events|places|persons)\/?$/);
            this.routParams.template = 'posts';
            this.routParams.language = params[1];
            this.routParams.country = params[2];
            this.routParams.category = params[3];
            return this.routParams;
        }

        // Пример: /ru/russia/msk
        if((new RegExp('^\/(?:' + this.languages.join('|') + ')\/\\w+\/\\w+\/?$')).test(this.rout)){
            params = this.rout.match(/^\/(\w+)\/(\w+)\/(\w+)\/?$/);
            this.routParams.template = 'posts';
            this.routParams.language = params[1];
            this.routParams.country = params[2];
            this.routParams.city = params[3];
            return this.routParams;
        }

        // Пример: /ru/russia/msk/events
        if((new RegExp('^\/(?:' + this.languages.join('|') + ')\/\\w+\/\\w+\/(?:events|places|persons)\/?$')).test(this.rout)){
            params = this.rout.match(/^\/(\w+)\/(\w+)\/(\w+)\/(events|places|persons)\/?$/);
            this.routParams.template = 'posts';
            this.routParams.language = params[1];
            this.routParams.country = params[2];
            this.routParams.city = params[3];
            this.routParams.category = params[4];
            return this.routParams;
        }

        this.routParams.badRout = true;
        return this.routParams;
    }

});