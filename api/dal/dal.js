
let mysql = require("mysql");

// (DAL) Data Access Layer

let db;

exports.setup = function(config) {
    db = mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database
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
            user.name = results[0].name_;
            user.surname = results[0].surname;
            user.email = results[0].email;
            callback(user, null);
        }
    })

}
//---------------------------- Get all users ------ ///

exports.getAll = function(callback) {
    let query = "SELECT * FROM vw_users";
    db.query(query, (err, results)=>{
        if (err) {
            callback(null, {err: err})
        } else {
            let users = [];
            for (let i = 0; i < results.length; i++){
                let user = {id:results[i].id,
                            name:results[i].name_,
                            surname:results[i].surname,
                            email:results[i].email,
                }
                users.push(user);
            }
            callback(users, null);
        }
    })
} 

exports.updateUser = function(user, callback) {
    let args = [user.id, user.name, user.surname, user.email, user.password];
    let query = "CALL pc_update_user(?, ?, ?, ?, ?);";
    db.query(query, args, callback);
}

//-----------------Product DAL ----------------///

exports.createProduct = function(product, callback) {
    let args = [product.name, product.brand, product.model, product.price, product.img];
    let query = "SELECT fn_insert_product(?, ?, ?, ?, ?) AS id";
    db.query(query, args, (err, results) => {
        if (err) {
            callback(null, err);
        } else {
            product.id = results[0].id;
            callback(product, null);
        }
    });
}

exports.getProduct = function(product, callback) {
    let args = [product.id];
    let query = "SELECT * FROM vw_product WHERE id = ?";
    db.query(query, args, (err, results)=>{
        if (err) {
            callback({err: err})
        } else {
            product.name = results[0].name_;
            product.brand = results[0].brand;
            product.model = results[0].model;
            product.price = results[0].price;
            product.img = results[0].img;
            callback(null);
        }
    })

}

exports.getAllProducts = function(callback) {
    let query = "SELECT * FROM vw_product";
    db.query(query, (err, results)=>{
        if (err) {
            callback(null, {err: err})
        } else {
            let products = [];
            for (let i = 0; i < results.length; i++){
                let product = {
                    id:    results[i].id,
                    name:  results[i].name_,
                    brand: results[i].brand,
                    model: results[i].model,
                    price: results[i].price,
                    img:   results[i].img,
                }
                products.push(product);
            }
            callback(products, null);
        }
    })
} 

exports.updateProduct = function(product, callback) {
    let args = [product.id, product.name, product.brand, product.model, product.price, product.img];
    let query = "CALL pc_update_product(?, ?, ?, ?, ?, ?);";
    db.query(query, args, (err,result) =>{
        callback(err);
    });
};

//-------------------ORDERS --------------//

exports.createOrder = function(order, callback) {
    let args = [order.user.id, order.product.id, order.quantity, order.price];
    let query = "SELECT fn_insert_order(?, ?, ?, ?) AS id";
    
    db.query(query, args, (err, results) => {
        if (err) {
            callback(err);
        } else {
            order.id = results[0].id;
            callback(null);
        }
    });
};

exports.getFromUser = function(user, callback) {
    let query = "SELECT * FROM vw_order WHERE id_user = ?";
    let args = [user.id];
    db.query(query, args, (err, results)=>{
        if (err) {
            callback(null, {err: err})
        } else {
            let orders = [];
            for (let i = 0; i < results.length; i++){
                let order = {
                    id:         results[i].id,
                    price:      results[i].price_paid,
                    quantity:   results[i].quantity,
                    date:       results[i].date_,
                    user:user,
                    product: {
                        id:    results[i].id_product,
                        name:  results[i].name_,
                        brand: results[i].brand,
                        model: results[i].model,
                        img:   results[i].img,
                    }
                    
                }
                orders.push(order);
            }
            callback(orders, null);
        }
    })
} 