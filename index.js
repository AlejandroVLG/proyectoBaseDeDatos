const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000; //Configuramos puerto heroku

//Config Cors Options
var corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,",
    preflightContinue: false,
    optionsSuccessStatus: 204
};

const router = require("./router");

const db = require("./db/db");

app.use(express.json());

app.use(router);

db.then(() => {

    app.listen(PORT, () => { console.log("Servidor levantado en el puerto ", PORT) });

}).catch((err) => console.log(err.message));