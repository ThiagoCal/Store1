console.log("Abriu o controller.js");

let baseURL = "http://localhost:3000"

function createUser(user, success, error) {
    $.ajax(baseURL + "/users", {
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(user),
        success: success,
        error: error,
    });
}

function authUser(user, success, error) {
    $.ajax(baseURL + "/auth", {
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(user),
        success: success,
        error: error,
    });
}

function getUser(token, success, error) {
    $.ajax(baseURL + "/users", {
        method: "GET",
        headers: {Authorization: "Bearer " + token},
        success: success,
        error: error,
    });
}

let user = {
    name: "Renan",
    surname: "Almeida",
    email: "nugget10@gmail.com",
    password: "123",
}

// createUser(user, (data) => {
//     authUser(user, (data) => {
//         let token = data.token;
//         getUser(token, (data) => {
//             console.log(data);
//         }, (err) => {
//             console.log(err.status, err.responseText);
//         })
//     }, (err) => {
//         console.log(err.status, err.responseText);
//     });
// }, (err) => {
//     console.log(err.status, err.responseText);
// });

let pCreateUser = (user) => new Promise((resolve, reject) => createUser(user, resolve, reject));

let pAuthUser = (user) => new Promise((resolve, reject) => authUser(user, resolve, reject));

let pGetUser = (token) => new Promise((resolve, reject) => getUser(token, resolve, reject));

pCreateUser(user)
    .then(() => { return pAuthUser(user); })
    .then((tokenData) => { return pGetUser(tokenData.token); })
    .then((userData) => { console.log(userData); })
    .catch((err) => { console.log(err.status, err.responseText); });
