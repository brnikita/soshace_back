require('./src/soshace.js');
require('./src/soshace/db.js');
require('./src/soshace/server.js');

var APP = {
    init: function(){

    }
}



Soshace.Db.instance('soshace', function(){
    Soshace.Server.instance(80, function(response, request){

    });
});






//var Routs = {};
//Routs['/'] = function(request, callback){
//    callback({statusCode: 200, contentType: 'text/html', body: 'Hello world!!!'})
//}
//var server = Soshace.Server.instance();
//server.addRouts(Routs).start()


//Soshace.Db.instance().getCollection('ru_countries', function(data){
//    if(data.error){
//        return;
//    }
//    if(data.collection){
//        data.collection.find().toArray(function(error, docs) {
//            if(error){
//                return;
//            }
//            console.log(docs);
//        });
//    }
//});
