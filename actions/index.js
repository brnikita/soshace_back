var mongodb = require('mongodb'),
    server = new mongodb.Server("127.0.0.1", 27017, {auto_reconnect: true, poolSize: 1 }),
    db_connector = new mongodb.Db('soshace', server, {w: 1});


exports.savePost = function(req, res){
    db_connector.open(function(err, db){
        if(err) {
            console.log(err);
            return;
        }
        db.collection('places', function(err, collection) {
            if(err) {
                console.log(err);
                return;
            }
            collection.insert(req.body, {safe:true}, function(err, result) {
                if(err){
                    console.log(err);
                    return;
                }
                console.log('Place inserted', result);
            });
        });
    });
};
