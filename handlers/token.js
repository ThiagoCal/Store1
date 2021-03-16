let jwt = require("jsonwebtoken");
let secret ="sjdisauhdjisuksjds02928jsa2992"

exports.encode = function(payload){
    let token = jwt.sign(payload, secret);
    return token;
}

exports.decode = function(token){
    let payload = jwt.verify(token, secret);
    return payload;
}