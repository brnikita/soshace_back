/**
 * Класс базы данных
 * @type {*}
 */
Soshace.Db = Soshace.extend({
    /**
     * Модуль mongoDb
     */
    mongoDb: require('mongodb'),
    /**
     *
     * @returns {Function|exports.ObjectID|exports.ObjectID|exports.ObjectID}
     * @constructor
     */
    ObjectID: function(){
        return this.mongoDb.ObjectID;
    },
    /**
     * Метод создания серевера базы данных
     * @returns {this.mongoDb.Server}
     */
    server: function(){
        return new this.mongoDb.Server("127.0.0.1", 27017, {auto_reconnect: true, poolSize: 1})
    },
    /**
     *
     * @returns {this.mongoDb.Db}
     */
    db_connector: function(){
        return new this.mongoDb.Db('soshace', this.server(), {w: 1});
    },
    /**
     *
     * @param callback
     * @returns {*}
     */
    openDb: function(callback){
        var _this = this;
        if(typeof _this.openDb.error === 'object' || typeof _this.openDb.db === 'object'){
            return callback(_this.openDb.error, _this.openDb.db);
        }
        _this.db_connector().open(function(error, db){
            _this.openDb.error = error;
            _this.openDb.db = db;
            callback(error, db);
        });
    },
    /**
     * Метод передающий коллекцию из базы данных в callback
     * @param collectionName
     * @param callback
     */
    getCollection: function(collectionName, callback){
        this.openDb(function(error, db){
            if(error) {
                callback({error: error});
                return;
            }
            db.collection(collectionName, function(error, collection) {
                if(error) {
                    callback({error: error});
                    return;
                }
                callback({collection: collection});
            });
        });
    }
});