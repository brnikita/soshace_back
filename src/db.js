var mongodb = require('mongodb'),

    Db = {
        server: function(){
            return new mongodb.Server("127.0.0.1", 27017, {auto_reconnect: true, poolSize: 1})
        },

        db_connector: function(){
            var _this = this;
            return new mongodb.Db('soshace', _this.server(), {w: 1});
        },

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
        }
    };

exports.ObjectID = mongodb.ObjectID;

exports.getCollection = function(collectionName, callback){
    Db.openDb(function(error, db){
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