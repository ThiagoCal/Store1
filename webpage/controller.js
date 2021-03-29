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

$(document).ready(() => {
    $("#buttonsignup").click(() => {
        let user = {
            name: $("#namesignup").val(),
            surname: $("#surnamesignup").val(),
            email: $("#emailsignup").val(),
            password: $("#passwordsignup").val(),
        };
        createUser(user).then(() => {
            alert("Usuário criado!");
        }).catch((err) => {
            console.log(err);
            alert(err.responseText);
        });
    });

    $("#buttonlogin").click(() => {
        let user = {
            email: $("#emaillogin").val(),
            password: $("#passwordlogin").val(),
        };
        authUser(user).then((res) => {
            let token = res.token;
            alert("Usuário logado!");
            console.log(token);
        }).catch((err) => {
            console.log(err);
            alert(err.responseText);
        });
    });
});
