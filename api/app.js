
const dal = require("./dal/dal.js");
const routes = require("./handlers/routes.js")
const fs = require("fs");

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
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
