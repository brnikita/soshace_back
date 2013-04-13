Soshace.Actions.Posts = Soshace.Actions.extend({
    /**
     * @constructor
     * @param params {Object} Данные запроса
     * @param db {Object} Экземпляр класса Soshace.Db
     */
    init: function(params, db){
        this._super(params, db);
        this.responseBody = Soshace.Template.instance('posts', this.params).templateRender();
    }
});