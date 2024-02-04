// packages
const http = require("http");


const config = require("../config.js");

var con;

async function requestListener(req, res) {

    // json object
    var obj = {};
    obj["code"] = "OK";

    // set headers
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);


    // filter api
    var api_request = req.url.split('/').filter(function (el) {
        return el !== "";
    });



    switch (api_request[0]) {
        case "customer":
            obj = await require("./endpoints/customer.js").endpoint(api_request, obj);
            break;
        case "payment_suggestion":
            obj = await require("./endpoints/payment_suggestion.js").endpoint(api_request, obj);

            break;
        default:
            obj["code"] = "NO_ENDPOINT";
            break;

    }

    res.end(JSON.stringify(obj));

}




async function initHttp(){
    const server = http.createServer(requestListener);

    const config_rest = await config.getConfig("rest");
    

    const rest_host = config_rest.host;
    const rest_port = config_rest.port;

    server.listen(rest_port, rest_host, () => {
        console.log("=========");
        console.log("Server running on '" + rest_host + ":" + rest_port + "'");
    });
    return true;
}







module.exports = { requestListener, initHttp };