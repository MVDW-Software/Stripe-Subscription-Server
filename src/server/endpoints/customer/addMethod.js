const config = require("../../../config.js");
const sql = require("../../sql.js").sql;

const stripe = require('stripe')(config.getConfig("service")["stripe_secret"]);


async function addCustomerMethods(api_request, obj, post){

    const query = await sql.query("SELECT * FROM customers WHERE id=?", api_request[1]);



    console.log(query.length);



    obj["data"] = {};
    obj["data"]["methods"] =  "This is a template for " + api_request[1];


    return obj;

}
module.exports = { addCustomerMethods };