var sql = require("../sql.js").sql;


// customer/{identification}/{task}
async function endpoint(api_request, obj, post = null){

    // Check if customer id is set
    if(api_request[1] == undefined){
        obj["code"] = "ENDPOINT_CUSTOMER_NULL";
        obj["data"] = {};
        return obj;
    }



    switch(api_request[2]){
        case "methods":
            await createCustomer(api_request, obj, post);
            break;

        case null || undefined:
            console.log("show user");
            break;
        default:
            obj["code"] = "ENDPOINT_CUSTOMER_INVALID_TASK";
            obj["data"] = {};
            return obj;
    }









    obj["data"] = {};
    obj["data"]["methods"] =  "This is a template for " + api_request[1];


    return obj;

}



async function createCustomer(api_request, obj, post = null){
    console.log(sql);


    var customer = await sql.query("select * from customers where id=?", api_request[1]);
    customer = customer[0];



    console.log(customer);
    console.log(customer.name);
    console.log(customer.length);

}














module.exports = { endpoint };