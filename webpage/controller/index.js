console.log("Loaded controller.js");

function signup() {
    let user = {
        name: $("#namesignup").val(),
        surname: $("#surnamesignup").val(),
        email: $("#emailsignup").val(),
        password: $("#passwordsignup").val(),
    };
    users.create(user).then(() => {
        alert("Usuário criado!");
    }).catch((err) => {
        console.log(err);
        alert(err.responseText);
    });
}

function login() {
    let user = {
        email: $("#emaillogin").val(),
        password: $("#passwordlogin").val(),
    };
    users.auth(user).then((res) => {
        let token = res.token;
        alert("Usuário logado!");
        sessionStorage.setItem("token", token);
        window.location.href = "user.html";
    }).catch((err) => {
        console.log(err);
        alert(err.responseText);
    });
}

$(document).ready(() => {
    $("#buttonsignup").click(signup);
    $("#buttonlogin").click(login);
});
