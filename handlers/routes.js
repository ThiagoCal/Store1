const user = require("./user.js")

let routes = [
    {method: "POST", endpoint: "/users", f: user.create},
    {method: "GET", endpoint: "/auth", f: user.auth},
    {method: "GET", endpoint: "/users", f: user.get},
    {method: "GET", endpoint: "/users", f: user.getAll},
    {method: "PUT", endpoint: "/users", f: user.update},
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