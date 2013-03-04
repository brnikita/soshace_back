var mongodb = require('mongodb'),
    server = new mongodb.Server("127.0.0.1", 27017, {auto_reconnect: true, poolSize: 1}),
    db_connector = new mongodb.Db('soshace', server, {w: 1}),
    openDb = function(callback){
        if(typeof openDb.err === 'object' || typeof openDb.db === 'object'){
            return callback(openDb.err, openDb.db);
        }
        db_connector.open(function(err, db){
            openDb.err = err;
            openDb.db = db;
            callback(err, db);
        });
    },
    sendData = function(res, data){
        res.set({
            'Content-Type': 'application/json'
        }).send(200, data);
    };

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
exports.savePost = function(req, res){
    openDb(function(err, db){
        if(err) {
            sendData(res, {status: 'error'});
            console.log(err);
            return;
        }
        db.collection('places', function(err, collection) {
            if(err) {
                sendData(res, {status: 'error'});
                console.log(err);
                return;
            }
            collection.insert(req.body, {safe:true}, function(err, result) {
                if(err){
                    sendData(res, {status: 'error'});
                    console.log(err);
                    return;
                }
                sendData(res, {status: 'ok'});
                console.log('Place inserted', result);
            });
        });
    });
};
