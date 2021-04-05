console.log("Loaded user_controller.js");

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

// <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
//     <title>Placeholder</title>
//     <rect width="100%" height="100%" fill="#55595c"/>
//     <img src="https://saborizatti.com.br/wp-content/uploads/2020/12/banana-nanica.png"></img>
// </svg>

function getproduct(product) {
    return `
    <div class="col">
        <div class="card shadow-sm">
            <div>
                <img width=200 height=200 class="img-fluid" src="` + product.img + `"></img>
            </div>

            <div class="card-body">
                <h2>` + product.name  + `</h2>
                <p><i>` + product.brand + ", " + product.model + `</i></p>
                <p>R$` + product.price.toFixed(2) + `</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                </div>
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
