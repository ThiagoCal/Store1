
const dal = require("./dal/dal.js");
const routes = require("./handlers/routes.js")
const express = require("express");
const app = express();
const fs = require("fs");


app.use(express.json());


// --------------------------------------------------
// LISTEN
// --------------------------------------------------
fs.readFile("config.json", (err, data) => {
    if (err) throw err;
    let config = JSON.parse(data);
    app.listen(config.port, () => {
        console.log(`Store API at http://localhost:${config.port}`);
        routes.register(app);
        dal.setup(config.db);
    }); 
});

// TODO dal.teardown();
