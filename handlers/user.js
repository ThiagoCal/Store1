const dal = require("../dal/dal.js");

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

    dal.authUser(user, (token, err) => {
        if(err !== null) {
            res.status(401).send("Combinação de usuários e senha inválidos");
        } else {
            res.status(200).json({token: token});
        }
    });
};

// --------------------------------------------------
// GET
// --------------------------------------------------
exports.get = function (req, res) {
    res.send("todo");
};

// --------------------------------------------------
// UPDATE
// --------------------------------------------------
exports.update = function UpdateUser(req, res) {
    res.send("todo");
};


