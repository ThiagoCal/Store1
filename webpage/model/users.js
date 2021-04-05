
const users = {};

users.create = function(user) {
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

users.auth = function(user) {
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

users.getinfo = function(token) {
    return new Promise((resolve, reject) => {
        $.ajax(baseURL + "/users", {
            method: "GET",
            headers: {Authorization: "Bearer " + token},
            success: resolve,
            error: reject,
        });
    });
}