var url = require('url');

Soshace.Router = Soshace.extend({
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
     * @param response
     */
    init:function(request, response){
        this.rout = url.parse(request.url).pathname;
        this.routParams = {
            language: '',
            country: '',
            city: '',
            category:'',
            subcategory:'',
            postId:''
        };
        this.routGetParams();
        console.log(this.routParams);
    },
    /**
     * Метод, который парсит URL
     * @function
     */
    routGetParams: function(){
        var params = [];
        if(this.rout === '') {
            return;
        }

        // Пример: /ru
        if(/^\/\w+\/?$/.test(this.rout)){
            params = this.rout.match(/^\/(\w+)\/?$/);
            this.routParams.language = params[1];
            return;
        }

        // Пример: /ru/events
        if(/^\/\w+\/(?:events|places|persons)\/?$/.test(this.rout)){
            params = this.rout.match(/^\/(\w+)\/(events|places|persons)\/?$/);
            this.routParams.language = params[1];
            this.routParams.category = params[2];
            return;
        }

        // Пример: /ru/russia
        if(/^\/\w+\/\w+\/?$/.test(this.rout)){
            params = this.rout.match(/^\/(\w+)\/(\w+)\/?$/);
            this.routParams.language = params[1];
            this.routParams.country = params[2];
            return;
        }

        // Пример: /ru/russia/events
        if(/^\/\w+\/\w+\/(?:events|places|persons)\/?$/.test(this.rout)){
            params = this.rout.match(/^\/(\w+)\/(\w+)\/(events|places|persons)\/?$/);
            this.routParams.language = params[1];
            this.routParams.country = params[2];
            this.routParams.category = params[3];
            return;
        }

        // Пример: /ru/russia/msk
        if(/^\/\w+\/\w+\/\w+\/?$/.test(this.rout)){
            params = this.rout.match(/^\/(\w+)\/(\w+)\/(\w+)\/?$/);
            this.routParams.language = params[1];
            this.routParams.country = params[2];
            this.routParams.city = params[3];
            return;
        }

        // Пример: /ru/russia/msk/events
        if(/^\/\w+\/\w+\/\w+\/(?:events|places|persons)\/?$/.test(this.rout)){
            params = this.rout.match(/^\/(\w+)\/(\w+)\/(\w+)\/(events|places|persons)\/?$/);
            this.routParams.language = params[1];
            this.routParams.country = params[2];
            this.routParams.city = params[3];
            this.routParams.category = params[4];
            return;
        }
    }

});