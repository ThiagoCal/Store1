
let mysql = require("mysql");

// (DAL) Data Access Layer

let db;

exports.setup = function() {
    db = mysql.createConnection({
        host: "localhost",
        port: "3306",
        user: "root" ,
        password: "",
        database: "store"
    });
    db.connect((err) => {
        if (err) {
            console.log("Error connecting to the database: " + err.stack);
        } else {
            console.log("Successfully connected to the database");
        }
    });
}

exports.teardown = function() {
    db.end();
}

exports.createUser = function(user, callback) {
    let args = [user.name, user.surname, user.email, user.password];
    let query = "SELECT fn_insert_user(?, ?, ?, ?) AS id";
    console.log(user);
    db.query(query, args, (err, results) => {
        if (err) {
            callback(null, err);
        } else {
            user.id = results[0].id;
           callback(user, null);
        }
    });
}

exports.authUser = function(user, callback) {
    let args = [user.email, user.password];
    let query = "SELECT fn_auth_user(?,  ?) AS n";
    db.query(query, args, (err, results) => {
        const ok = results[0].n === 1;
        if (err || !ok) {
            callback(null, err);
        } else {
            const token = "123";
            callback(token, null);
        }
    })
}