const express = require("express");

const app = express();

const port = 3000;

const router = require("./router");

const db = require("./db/db");

app.use(express.json());

app.use(router);

db.then(()=>{

    app.listen(port, ()=> {console.log("Servidor levantado en el puerto ", port)});

}).catch((err) => console.log(err.message));