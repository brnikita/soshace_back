var db = require('./db'),
    base = require('./base');

exports.index = function(req, res){
    res.render('layout', {title: 'Soshace'});
};

exports.ping = function(req, res){
    var data = '',
        callback = req.query['callback'];
    if(callback){
        data = req.query['callback'] + '.call(window, {response: "pong"})';
    }else{
        data = 'console.log(Parameter "callback" is empty.);';
    }
    res.set({
        'Content-Type': 'application/javascript'
    }).send(200, data);
};

exports.getCountries = function(req, res){
    db.getCollection('country_', function(data){
        if(data.error){
            base.sendJson(res, {error: data.error});
            return;
        }
        if(data.collection){
            data.collection.find({}, {country_name_ru: true}).toArray(function(error, docs) {
                if(error){
                    base.sendJson(res, {error: error});
                    return;
                }
                base.sendJson(res, docs);
            });
        }
    });
};

exports.getCities = function(req, res){
    var countryId  = req.body['countryId'];
    if(!countryId) return;

    db.getCollection('city_', function(data){
        if(data.error){
            base.sendJson(res, {error: data.error});
            return;
        }
        if(data.collection){
            data.collection.find({id_country: new db.ObjectID(countryId)}, {city_name_ru: true}).toArray(function(error, docs) {
                if(error){
                    base.sendJson(res, {error: error});
                    return;
                }
                base.sendJson(res, docs);
            });
        }
    });
};

exports.baseConvert = function(req, res){
    var en_countries,
        ru_countries
    db.getCollection('en_countries', function(data){
        en_countries = data.collection;
        db.getCollection('ru_countries', function(data){
            ru_countries = data.collection;
        });
        db.getCollection('country_', function(data){
            data.collection.find({}, {country_name_ru: true}).toArray(function(error, docs) {
                for(var i = 0; i < docs.length; i++){
                    (function(i){
                        en_countries.findOne({name: docs[i].country_name_en}, function(error, doc) {
                            console.log('name ', docs[i].country_name_ru, ' _id_en_country ', doc['_id']);
//                            ru_countries.save({name: docs[i].country_name_ru, _id_en_country: new db.ObjectID(doc['_id'])}, function(){});
                        });
                    })(i);
                }
            });
        });
    });


};