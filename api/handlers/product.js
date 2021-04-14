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

function checkimg(s) {
    // TODO
    return true;
    // %s @ %s
}

// --------------------------------------------------
// HANDLERS
// --------------------------------------------------
function validateCreateProduct(product){
    let err;
    if (emptystring(product.name)){
        err = "Campo name do produto não pode ser vazio."
    }
    else if(emptystring(product.brand)){
        err = "Campo brand do produto não pode ser vazio."
    }
    else if (emptystring(product.model)){
        err = "Campo model do produto não pode ser vazio."
    }
    else if (!checkprice(product.price)){
        err = "Formato de preço inválido."
    }
    else if (!checkimg(product.img)){
        err = "Formato de img inválido."
    }
    else if (emptystring(product.price)){
        err = "Campo price não pode ser vazio."
    }
    
    return {
        err: err,
        ok: err === undefined,
    }
};

exports.create = function(req, res) {
    const product = req.body;
    let tk = req.get("Authorization");
    tk = tk.substring(7);
    let user = token.decode(tk);
    delete user.iat;
    if (user.id !== 1){
        res.status(403).send("Usuário não autorizado")
    }
    // validation
    let result = validateCreateProduct(product);
    if (!result.ok) {
        res.status(422).send("erro de validação: "+result.err);
        return;
    }
    product.price = JSON.parse(product.price)
    dal.createProduct(product, (product, err) => {
        if(err !== null) {
            if (err.errno === 1062){
                res.status(409).send("Produto já cadastrado");
            } else{
                res.status(400).send(err);
            }
        } else {
            res.status(201).json({id: product.id});
        }
    });
};


// --------------------------------------------------
// GET
// --------------------------------------------------

exports.get = function (req, res) {
    let id = req.params.id
    let product = {id:id};
    dal.getProduct(product, (err) => {
        if(err !== null) {
            res.status(401).send("Não foi possível recuperar as informações do produto");
            console.log(err);
        } else {
            res.status(200).json(product);
        }
    });
};
// --------------------------------------------------
// GET ALL PRODUCTS
// --------------------------------------------------
exports.getAll = function (req, res) {
    dal.getAllProducts((products, err) => {
        if(err !== null) {
            res.status(401).send("Não foi possível recuperar as informações dos produtos");
            console.log(err);
        } else {
            res.status(200).json(products);
        }
    });
};



// --------------------------------------------------
// UPDATE
// --------------------------------------------------

function validateUpdateProduct(product) {
    return validateCreateProduct(product);
}

exports.update = function (req, res) {
    
    let product = req.body;
    let tk = req.get("Authorization");
    tk = tk.substring(7);
    let user = token.decode(tk);
    delete user.iat;
    if (user.id !== 1){
        res.status(403).send("Usuário não autorizado")
    }
    console.log(product)
    let result = validateUpdateProduct(product);
    if (!result.ok) {
        res.status(400).send("erro de validação!");
        return;
    } 
    product.id = req.params.id;

    product.price = JSON.parse(product.price)
    dal.updateProduct(product, (err) => {i
        if(err !== null) {
            res.status(401).send("Não foi possível atualizar as informações do produto");
            console.log(err);
        } else {
            res.status(200).json("informações atualizadas");
        }
    });
    
};


