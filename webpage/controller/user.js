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

$(document).ready(() => {
    token = sessionStorage.getItem("token");
    // sessionStorage.removeItem("token");
    console.log(token);

    getinfo(token);
});
