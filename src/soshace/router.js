//    on: function(request, response){
//        var pathName = url.parse(request.url).pathname;
//
//        this.routs[pathName](request, function(data){
//            response.writeHead(data.statusCode, {"Content-Type": data.contentType});
//            response.write(data.body);
//            response.end();
//        });
//    }