require('./src/soshace.js');
require('./src/soshace/db.js');
require('./src/soshace/server.js');
require('./src/soshace/router.js');
require('./src/soshace/template.js');
require('./src/soshace/actions.js');
require('./src/soshace/actions/posts.js');
require('./src/soshace/actions/addPost.js');
require('./src/soshace/response.js');


var soshaceDB = Soshace.Db.instance('soshace', function(){
    Soshace.Server.instance(8080, function(request, response){
        Soshace.Response.instance(request, response, soshaceDB).send();
    });
});