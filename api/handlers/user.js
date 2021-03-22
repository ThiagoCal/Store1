const { response } = require("express");
const dal = require("../dal/dal.js");
const token = require("./token.js")

// --------------------------------------------------
// AUXILIARY
// --------------------------------------------------

function emptystring(s) {
    return typeof(s) !== "string" || s === "";
}

function checkemail(s) {
    // TODO
    return true;
    // %s @ %s
}

function checkpassword(s) {
    // TODO
    return true;
    // %s @ %s
}

// --------------------------------------------------
// HANDLERS
// --------------------------------------------------
function validateCreateUser(user){
    let err;
    if (emptystring(user.name)){
        err = "Campo name do usuário não pode ser vazio."
    }
    else if(emptystring(user.surname)){
        err = "Campo surname do usuário não pode ser vazio."
    }
    else if (emptystring(user.email)){
        err = "Campo email do usuário não pode ser vazio."
    }
    else if (!checkemail(user.email)){
        err = "Formato de email inválido."
    }
    else if (emptystring(user.password)){
        err = "Campo password não pode ser vazio."
    }
    else if (!checkpassword(user.password)){
        err = "Formato de password inválido."
    }
    return {
        err: err,
        ok: err === undefined,
    }
};

exports.create = function(req, res) {
    const user = req.body;
    
    console.log(user);

    // validation
    let result = validateCreateUser(user);
    if (!result.ok) {
        res.status(422).send("erro de validação: "+result.err);
        return;
    }

    dal.createUser(user, (user, err) => {
        if(err !== null) {
            if (err.errno === 1062){
                res.status(409).send("Usuário já cadastrado");
            } else{
                res.status(400).send(err);
            }
        } else {
            res.status(201).json({id: user.id});
        }
    });
};

// --------------------------------------------------
// AUTH
// --------------------------------------------------
function validateAuthUser(user){
    let ok = nonemptystring(user.email);
    ok = ok || checkemail(user.email);
    ok = ok || nonemptystring(user.password);
    return ok;
}

exports.auth = function (req, res) {
    const user = req.body;
    
    // validation
    let ok = validateAuthUser(user);
    if (!ok) {
        res.status(422).send("E-mail ou senha inválidos");
        return;
    }

    dal.authUser(user, (id, err) => {
        if(err !== null) {
            res.status(401).send("Combinação de usuários e senha inválidos");
        } else {
            let tk = token.encode({id: id})
            res.status(200).json({token: tk});
        }
    });
};


// --------------------------------------------------
// GET
// --------------------------------------------------
exports.get = function (req, res) {
    let tk = req.get("Authorization");
    tk = tk.substring(7);
    let user = token.decode(tk);
    delete user.iat;

    dal.getUser(user, (user, err) => {
        if(err !== null) {
            res.status(401).send("Não foi possível recuperar as informações do usuário");
            console.log(err);
        } else {
            res.status(200).json(user);
        }
    });
};
// --------------------------------------------------
// GET ALL USERS
// --------------------------------------------------
exports.getAll = function (req, res) {
    let tk = req.get("Authorization");
    tk = tk.substring(7);
    let user = token.decode(tk);
    delete user.iat;
    if (user.id !== 1){
        res.status(403).send("Usuário não autorizado")
    }

    dal.getAll((users, err) => {
        if(err !== null) {
            res.status(401).send("Não foi possível recuperar as informações do usuário");
            console.log(err);
        } else {
            res.status(200).json(users);
        }
    });
};



// --------------------------------------------------
// UPDATE
// --------------------------------------------------

function validateUpdateUser(user) {
    return validateCreateUser(user);
}

exports.update = function UpdateUser(req, res) {
    let user = req.body;
    let ok = validateUpdateUser(user);
    if (!ok) {
        res.status(400).send("erro de validação!");
        return;
    }
    
    let tk = req.get("Authorization");
    tk = tk.substring(7);
    user.id = token.decode(tk).id;
  
    
    dal.updateUser(user, (err) => {
        if(err !== null) {
            res.status(401).send("Não foi possível atualizar as informações do usuário");
            console.log(err);
        } else {
            res.status(200).json("informações atualizadas");
        }
    });
    
};


