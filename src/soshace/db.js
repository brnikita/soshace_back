/**
 * Модуль mongoDb
 */
var mongoDb = require('mongodb'),
    /**
     * База данных Soshace
     */
        db = null,
    /**
     * Ошибка при подключении к базе Soshace
     */
        error = null,
    /**
     * Имя базы данных
     */
        databaseName = 'soshace',
    /**
     * Получаем коннектор к базе данных Soshace
     */
        db_connector =  new mongoDb.Db(databaseName, new mongoDb.Server('127.0.0.1', 27017, {auto_reconnect: true, poolSize: 1}), {w: 1});


/**
 * Объект базы данных
 * @type {*}
 */
Soshace.Db = {
    /**
     * Открываем базу данных
     * @param callback {Function} Запускается при успешном открытии базы
     */
    open: function(callback){
        db_connector.open(function(err, database){
            if(err !== null){
                console.log('Database ',databaseName,' not opened with error: ', err);
                error = err;
            }else if(typeof database !== null){
                console.log('Database ',databaseName,' was opened successfully');
                db = database;
                if(typeof callback === 'function'){
                    callback();
                }
            }
        });
    },
    /**
     * метод ObjectID
     */
    objectID: function(){
        mongoDb.ObjectID.apply(mongoDb, arguments);
    },
    /**
     * Метод получения базы данных Soshace
     */
    getDb: function(){
        return {db: db, error: error};
    },
    /**
     * collection([[name[, options]], callback);
     * Метод получения коллекции из базы данных     *
     * http://mongodb.github.io/node-mongodb-native/markdown-docs/collections.html
     */
    collection: function(){
        db.collection.apply(db, arguments);
    }
};