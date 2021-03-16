
const dal = require("./dal/dal.js");
const routes = require("./handlers/routes.js")
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());


// --------------------------------------------------
// LISTEN
// --------------------------------------------------

app.listen(port, () => {
    console.log(`Store API at http://localhost:${port}`);
    routes.register(app);
    dal.setup();
});

// TODO dal.teardown();
