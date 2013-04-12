require('./src/soshace.js');
require('./src/soshace/db.js');
require('./src/soshace/server.js');
require('./src/soshace/router.js');
require('./src/soshace/template.js');
require('./src/soshace/response.js');


Soshace.Db.instance('soshace', function(){
    Soshace.Server.instance(80, function(request, response){
        Soshace.Response.instance(request, response).send();
    });
});
