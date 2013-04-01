exports.sendJson = function(XhrResponse, data){
    XhrResponse.set({
        'Content-Type': 'application/json'
    }).send(200, data);
};