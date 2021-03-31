const user = require("./user.js")
const product = require("./product.js")

let routes = [
    {method: "POST", endpoint: "/users", f: user.create},
    {method: "POST", endpoint: "/auth", f: user.auth},
    {method: "GET", endpoint: "/users", f: user.get},
    {method: "GET", endpoint: "/allusers", f: user.getAll},
    {method: "PUT", endpoint: "/users", f: user.update},
    {method: "POST", endpoint: "/products", f: product.create},
    {method: "GET", endpoint: "/products/:id", f: product.get},
    {method: "GET", endpoint: "/products", f: product.getAll},
    {method: "PUT", endpoint: "/products", f: product.update},
]

exports.register = function(app) {
    for (i=0; i<routes.length; i++) {
        let route = routes[i];
    if(route.method === "POST") {
        app.post(route.endpoint, route.f);
    } else if (route.method === "GET"){
        app.get(route.endpoint, route.f);
    } else if (route.method === "PUT") {
        app.put(route.endpoint, route.f);
    } else if (route.method === "DELETE"){
        app.delete(route.endpoint, route.f);
    }
    }
}