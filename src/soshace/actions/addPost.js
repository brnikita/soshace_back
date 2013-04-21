Soshace.Actions.AddPost = Soshace.Actions.extend({
    /**
     * @constructor
     * @param params {Object} ƒанные запроса
     * @param db {Object} Ёкземпл€р класса Soshace.Db
     */
    init: function(params, db){
        this._super(params, db);
        this.responseBody = Soshace.Template.instance('addPost', this.params).templateRender();
    }
});
