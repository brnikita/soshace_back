require('./src/soshace.js');
require('./src/soshace/db.js');
require('./src/soshace/server.js');
require('./src/soshace/router.js');

var APP = {
    init: function(){

    }
}



Soshace.Db.instance('soshace', function(){
    Soshace.Server.instance(80, function(response, request){
          Soshace.Router.instance(response, request);
    });
});
