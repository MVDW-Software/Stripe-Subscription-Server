const config = require("../../../../config.js");
const sql = require("../../../sql/sql.js").sql;

const stripe = require('stripe')(config.getConfig("service")["stripe_secret"]);


async function endpoint(api_request, obj, post) {
    obj["data"] = {};

    if (api_request[1] == undefined || api_request[2] == undefined) {
        obj["code"] = "ENDPOINT_METHODS_ASK_ADD_NULL";
        return obj;
    }
    const customer_details = require("../../../../data/methods/customer_details.json");
    const methods = require("../../../../data/methods/types.json");

    if (!methods.includes(api_request[2])) {
        obj["code"] = "ENDPOINT_METHODS_ASK_ADD_INVALID";
        return obj;
    }




    const query = await sql.query("SELECT * FROM customers WHERE id=?", api_request[1]);


    obj["data"]["billing_details"] = require("../../../../data/methods/types/" + api_request[2] + ".json")



    // inject value from customer data into customer_details
    function injectCustomerData(data, path = undefined) {

        for (const [key, value] of Object.entries(data)) {


            let local_path = path;

            if (typeof value === 'object') {
                if (path) {
                    local_path += "." + key;
                    injectCustomerData(value, local_path)

                } else {
                    injectCustomerData(value, key)
                }

            } else {
                type = path.split(".");

                eval("customer_details." + path + ".value = query[0]?." + type[type.length - 1] + " ?? null");
            }
        }
    }

    injectCustomerData(customer_details)





    /*
    const customer_details = {
        "address": {
            "city": {
                "required": true, "value": query[0]?.city ?? null,
            },
            "country": {
                "required": true, "value": query[0]?.country ?? null,
            },
            "line1": {
                "required": true, "value": query[0]?.line1 ?? null,
            },
            "line2": {
                "required": false, "value": query[0]?.line2 ?? null,
            },
            "postal_code": {
                "required": true, "value": query[0]?.postal_code ?? null,
            },
            "state": {
                "required": true, "value": query[0]?.state ?? null,
            },
        },
        "email": {
            "required": true, "value": query[0]?.email ?? null,
        },
        "name": {
            "required": true, "value": query[0]?.name ?? null,
        },
        "phone": {
            "required": true, "value": query[0]?.phone ?? null,
        }
    };*/




    obj["data"]["customer_details"] = customer_details;


    return obj;
}
module.exports = { endpoint };