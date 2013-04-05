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
    db.getCollection('ru_countries', function(data){
        if(data.error){
            base.sendJson(res, {error: data.error});
            return;
        }
        if(data.collection){
            data.collection.find().toArray(function(error, docs) {
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
    var countryId  = req.body['_id_en_country'];
    if(!countryId) return;

    db.getCollection('en_countries', function(data){
        if(data.error){
            base.sendJson(res, {error: data.error});
            return;
        }
        if(data.collection){
            data.collection.find({_id_en_country: new db.ObjectID(countryId)}, {name: true}).toArray(function(error, docs) {
                if(error){
                    base.sendJson(res, {error: error});
                    return;
                }
                base.sendJson(res, docs);
            });
        }
    });
};

//exports.baseConvert = function(req, res){
//    var en_countries,
//        ru_countries
//    db.getCollection('en_countries', function(data){
//        en_countries = data.collection;
//        db.getCollection('ru_countries', function(data){
//            ru_countries = data.collection;
//        });
//        db.getCollection('country_', function(data){
//            data.collection.find().toArray(function(error, docs) {
//                for(var i = 0; i < docs.length; i++){
//                    (function(i){
//                        en_countries.findOne({name: docs[i].country_name_en}, function(error, doc) {
//                            ru_countries.save({name: docs[i].country_name_ru, _id_en_country: doc['_id']}, function(){});
//                        });
//                    })(i);
//                }
//            });
//        });
//    });
//};