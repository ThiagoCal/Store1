
const products = {};

products.getall = function() {
    return new Promise((resolve, reject) => {
        $.ajax(baseURL + "/products", {
            method: "GET",
            success: resolve,
            error: reject,
        });
    });
}

