
const baseURL = "http://localhost:3000";

const order = {};

order.create = function(order) {
    return new Promise((resolve, reject) => {
        $.ajax(baseURL + "/orders", {
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(order),
            success: resolve,
            error: reject,
        });
    });
}


order.getfromuser = function(token) {
    return new Promise((resolve, reject) => {
        $.ajax(baseURL + "/users/orders", {
            method: "GET",
            headers: {Authorization: "Bearer " + token},
            success: resolve,
            error: reject,
        });
    });
}