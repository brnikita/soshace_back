Soshace.Actions.AddPost = Soshace.Actions.extend({
    /**
     * @constructor
     * @param params {Object} ������ �������
     * @param db {Object} ��������� ������ Soshace.Db
     */
    init: function(params, db){
        this._super(params, db);
        this.responseBody = Soshace.Template.instance('addPost', this.params).templateRender();
    }
});
