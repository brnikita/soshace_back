/**
 * Модуль mongoDb
 */
var mongoDb = require('mongodb');
/**
 * Класс базы данных
 * @Class
 * @type {*}
 */
Soshace.Db = Soshace.extend({
    /**
     * База данных Soshace
     */
    db: null,
    /**
     * Ошибка при подключении к базе Soshace
     */
    error: null,
    /**
     * Получаем коннектор к базе данных Soshace
     */
    db_connector:  null,
    /**
     * Конструктор базы данных
     * @constructor
     * @param dbName {String} Имя базы данных
     * @param callback {Function}
     */
    init: function(dbName, callback){
        var _this = this,
            dbConnector = null;

        if(typeof Soshace.Db.dbServer === 'undefined'){
            Soshace.Db.dbServer = new mongoDb.Server('127.0.0.1', 27017, {auto_reconnect: true, poolSize: 1});
        }

        dbConnector = new mongoDb.Db(dbName, Soshace.Db.dbServer, {w: 1});

        dbConnector.open(function(err, database){
            if(err !== null){
                console.log('Database ',dbName,' not opened with error: ', err);
                _this.error = err;
            }else if(typeof database !== null){
                console.log('Database ',dbName,' was opened successfully');
                _this.db = database;
                if(typeof callback === 'function'){
                    callback();
                }
            }
        });
    },
    /**
     * метод ObjectID
     * @function
     */
    objectID: function(){
        mongoDb.ObjectID.apply(mongoDb, arguments);
    },
    /**
     * Метод получения базы данных Soshace
     * @function
     */
    getDb: function(){
        return {db: this.db, error: this.error};
    },
    /**
     * collection([[name[, options]], callback);
     * @function
     * Метод получения коллекции из базы данных     *
     * http://mongodb.github.io/node-mongodb-native/markdown-docs/collections.html
     */
    collection: function(){
        this.db.collection.apply(this.db, arguments);
    }
});