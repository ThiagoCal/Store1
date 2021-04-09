console.log("Loaded controller/user.js");

let token, _products;

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

function getproduct(i, product) {
    return `
    <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100">
                    <a href="` + product.id + `"><img class="card-img-top" src=" `+ product.img+ ` " alt=""></a>
                    <div class="card-body">
                        <h4 class="card-title">
                            `+ product.name  + `
                        </h4>
                        <h5>R$` + product.price.toFixed(2) + `</h5>
                        <p class="card-text">` + product.brand + ", " + product.model + ` Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit. Amet numquam aspernatur!</p>
                    </div>
                <div class="card-footer">
                    <button onclick="buyproduct(` + i + `)" class="btn btn-primary">Buy</button>
                </div>
            </div>
    </div> 
`;
}

function buyproduct(i) {
    let product = _products[i];
    let o = {
        product: product,
        quantity: 1,
        price: product.price,
    };
    return order.create(token, o).then((order, err) => {
        alert("Pedido feito!");
    }).catch((err) => {
        console.log(err);
        console.log(err.responseText);
    })
}


function getproducts() {
    return products.getall().then((result) => {
        _products = result;
        let html = "";
        for (let i = 0; i < _products.length; i++) {
            html += getproduct(i, _products[i]);
        }
        $("#products").html(html);
    }).catch((err) => {
        console.log(err);
        console.log(err.responseText);
    })
}

$(document).ready(() => {
    token = sessionStorage.getItem("token");
    console.log(token);
    getinfo(token);
    getproducts();
});
