console.log("Loaded controller/product.js");

let token;
let id;

function getinfo(id) {
    return products.get(id).then((product) => {
        $("#product-name").text(product.name);
        $("#product-brand").text(product.brand);
        $("#product-model").text(product.model);
        $("#product-price").text("R$" + product.price.toFixed(2));
        $("#product-img").attr("src", product.img);
    }).catch((err) => {
        console.log(err);
        console.log(err.responseText);
    });
}

function buy() {
    window.location.href = "buy.html";
}

$(document).ready(() => {
    token = sessionStorage.getItem("token");
    id = sessionStorage.getItem("productid");
    console.log("token", token);
    console.log("product id", id);
    getinfo(id);
});
