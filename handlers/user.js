const dal = require("../dal/dal.js");
const token = require("./token.js")

// --------------------------------------------------
// AUXILIARY
// --------------------------------------------------

function nonemptystring(s) {
    return typeof(s) === "string" && s !== "";
}

function checkemail(s) {
    // TODO
    return true;
    // %s @ %s
}

// --------------------------------------------------
// HANDLERS
// --------------------------------------------------
function validateCreateUser(user){
    let ok = nonemptystring(user.name);
    ok = ok || nonemptystring(user.surname);
    ok = ok || nonemptystring(user.email);
    ok = ok || checkemail(user.email);
    ok = ok || nonemptystring(user.password);
    return ok;
   
};

exports.create = function(req, res) {
    const user = req.body;
    
    // validation
    let ok = validateCreateUser(user);
    if (!ok) {
        res.status(400).send("erro de validação!");
        return;
    }

    dal.createUser(user, (user, err) => {
        if(err !== null) {
            res.status(400).send(err);
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
    user.iat = undefined;

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
    user.iat = undefined;

    dal.getAll(user, (user, err) => {
        if(err !== null) {
            res.status(401).send("Não foi possível recuperar as informações do usuário");
            console.log(err);
        } else {
            res.status(200).json(user);
        }
    });
};



// --------------------------------------------------
// UPDATE
// --------------------------------------------------
exports.update = function UpdateUser(req, res) {
    res.send("todo");
};


