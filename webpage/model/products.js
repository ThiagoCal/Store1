
const products = {};

products.get = function(id) {
    return new Promise((resolve, reject) => {
        $.ajax(baseURL + "/products/" + id, {
            method: "GET",
            success: resolve,
            error: reject,
        });
    });
}

products.getall = function() {
    return new Promise((resolve, reject) => {
        $.ajax(baseURL + "/products", {
            method: "GET",
            success: resolve,
            error: reject,
        });
    });
}

