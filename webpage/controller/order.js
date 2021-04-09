console.log("Loaded controlle/order.js");

let token;


function getorder(order) {
    return `
    <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100">
                    <a href="` + product.id + `"><img class="card-img-top" src=" `+ product.img+ ` " alt=""></a>
                    <div class="card-body">
                        <h4 class="card-title">
                            `+ product.name  + `
                        </h4>
                        <h5>R$` + order.price.toFixed(2) + `</h5>
                        <p class="card-text">` + product.brand + ", " + product.model + ` Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit. Amet numquam aspernatur!</p>
                    </div>
                
            </div>
    </div> 
`;
}



function getorders() {
    return order.getfromuser(token).then((order) => {
        console.log(order);
        let html = "";
        for (let i = 0; i < order.length; i++) {
            html += getorder(order[i]);
        }
        $("#orders").html(html);
    }).catch((err) => {
        console.log(err);
        console.log(err.responseText);
    })
}

$(document).ready(() => {
    token = sessionStorage.getItem("token");
    // sessionStorage.removeItem("token");
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE4MDA0MDE1fQ.YbjKdTl_NQM2NfRcw8V66ZfH8aqiGmbLv-S7N_XIFAg";
    console.log(token);

    getorders();
});
