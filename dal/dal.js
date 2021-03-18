
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
    let query = "SELECT fn_auth_user(?,  ?) AS id";
    db.query(query, args, (err, results) => {
        const id = results[0].id
        if (err || id === null) {
            callback(null, {err: err})
        } else {
            callback(id, null);
        }
    })
}

exports.getUser = function(user, callback) {
    let args = [user.id];
    let query = "SELECT * FROM vw_users WHERE id = ?";
    db.query(query, args, (err, results)=>{
        if (err) {
            callback(null, {err: err})
        } else {
            user.name = results[0].name;
            user.surname = results[0].surname;
            user.email = results[0].email;
            callback(user, null);
        }
    })

}
//---------------------------- Get all users ------ ///

async function getAll() {
    return await db.user.findAll();
}

exports.getAll = function (req, res, next) {
    getAll()
        .then(users => res.json(users))
        .catch(next);
}

/*exports.getAllUsers = function(user, callback) {
    let args = [user.id];
    let query = "SELECT * FROM vw_users WHERE id = ?";
    db.query(query, args, (err, results)=>{
        if (err) {
            callback(null, {err: err})
        } else {
            user.name = results[0].name;
            user.surname = results[0].surname;
            user.email = results[0].email;
            callback(user, null);
        }
    })

} */