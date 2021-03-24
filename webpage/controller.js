console.log("Abriu o controller.js");

let baseURL = "http://localhost:3000"

function createUser(user) {
    return new Promise((resolve, reject) => {
        $.ajax(baseURL + "/users", {
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(user),
            success: resolve,
            error: reject,
        });
    });
}

function authUser(user) {
    return new Promise((resolve, reject) => {
        $.ajax(baseURL + "/auth", {
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(user),
            success: resolve,
            error: reject,
        });
    });
}

function getUser(token) {
    return new Promise((resolve, reject) => {
        $.ajax(baseURL + "/users", {
            method: "GET",
            headers: {Authorization: "Bearer " + token},
            success: resolve,
            error: reject,
        });
    });
}

let user = {
    name: "Renan",
    surname: "Almeida",
    email: "nugget12@gmail.com",
    password: "123",
}

createUser(user)
    .then(() => { return authUser(user); })
    .then((tokenData) => { return getUser(tokenData.token); })
    .then((userData) => { console.log(userData); })
    .catch((err) => { console.log(err.status, err.responseText); })
;
