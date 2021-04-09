const { response } = require("express");
const dal = require("../dal/dal.js");
const token = require("./token.js")

// --------------------------------------------------
// AUXILIARY
// --------------------------------------------------

function emptystring(s) {
    return typeof(s) !== "string" || s === "";
}

function checkprice(s) {
    // TODO
    return true;
    // %s @ %s
}

// --------------------------------------------------
// HANDLERS
// --------------------------------------------------
function validateCreateProduct(product){
    let err;
    if (emptystring(order.product.id)){
        err = "Campo id do produto não pode ser vazio."
    }
    else if(emptystring(order.price)){
        err = "Campo price do pedido não pode ser vazio."
    }
    else if (emptystring(order.quantity)){
        err = "Campo quantity do pedido não pode ser vazio."
    }
    else if (!checkprice(order.price)){
        err = "Formato de preço inválido."
    }
    
    return {
        err: err,
        ok: err === undefined,
    }
};

exports.create = function(req, res) {
    const order = req.body;
    let tk = req.get("Authorization");
    tk = tk.substring(7);
    let user = token.decode(tk);
    delete user.iat;
    order.user = user;
     // validation
    let result = validateCreateOrder(order);
    if (!result.ok) {
        res.status(422).send("erro de validação: "+result.err);
        return;
    }
    order.price = JSON.parse(order.price)/100
    dal.createrOrder(order, (err) => {
        if(err !== null) {
            res.status(400).send(err);
            
        } else {
            res.status(201).json({id: order.id});
        }
    });
};


// --------------------------------------------------
// GET
// --------------------------------------------------

exports.getfromuser = function (req, res) {
    let tk = req.get("Authorization");
    tk = tk.substring(7);
    let user = token.decode(tk);
    delete user.iat;
    dal.getFromUser(user, (orders, err) => {
        if(err !== null) {
            res.status(401).send("Não foi possível recuperar as informações dos pedidos");
            console.log(err);
        } else {
            res.status(200).json(orders);
        }
    });
};

