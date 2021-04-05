console.log("Loaded controller/user.js");

let token;

function getinfo(token) {
    return users.getinfo(token).then((user) => {
        $("#user-name").text(user.name);
        $("#user-surname").text(user.surname);
        $("#user-email").text(user.email);
    }).catch((err) => {
        console.log(err);
        console.log(err.responseText);
    })
}

function gotoproduct(id) {
    sessionStorage.setItem("productid", id);
    window.location.href = "product.html";
}

function getproduct(product) {
    return `
    <div class="col">
        <div class="card shadow-sm">
            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" role="img" onclick=gotoproduct(` + product.id + `)>
              <rect width="100%" height="100%" fill="#55595c"/>
              <image xlink:href="` + product.img + `" x="0" y="0" height="100%" width="100%" preserveAspectRatio="none"/>
            </svg>

            <div class="card-body">
                <h2>` + product.name  + `</h2>
                <p><i>` + product.brand + ", " + product.model + `</i></p>
                <p>R$` + product.price.toFixed(2) + `</p>
            </div>
        </div>
    </div>
    `;
}

function getproducts() {
    return products.getall().then((products) => {
        console.log(products);
        let html = "";
        for (let i = 0; i < products.length; i++) {
            html += getproduct(products[i]);
        }
        $("#products").html(html);
    }).catch((err) => {
        console.log(err);
        console.log(err.responseText);
    })
}

$(document).ready(() => {
    token = sessionStorage.getItem("token");
    // sessionStorage.removeItem("token");
    console.log(token);

    getinfo(token);
    getproducts();
});
