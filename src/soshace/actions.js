Soshace.Actions = Soshace.extend({
    /**
     * Объект доступа к базе данных
     */
    db: null,
    /**
     * Тело ответа
     */
    responseBody: null,
    /**
     * Данные запроса
     */
    params: null,
    /**
     * @constructor
     * @param params {Object} Данные запроса
     * @param db {Object} Экземпляр класса Soshace.Db
     */
    init: function(params, db){
        this.params = params;
        this.db = db;
    },
    /**
     * Метод возвращающий тело ответа
     * @function
     * @returns {null}
     */
    start: function(){
        return this.responseBody;
    }
});
