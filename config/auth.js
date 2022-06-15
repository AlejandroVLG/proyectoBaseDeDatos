require('dotenv').config();
module.exports = {
    //secret: process.env.AUTH_SECRET,
    secret: process.env.AUTH_SECRET || "pimpamtomalacasitos", //KEY USADA PARA ENCRIPTAR

    //expires: process.env.AUTH_EXPIRES,
    expires: process.env.AUTH_EXPIRES || "12h", //DURACIÓN DEL TOKEN
    //rounds: process.env.AUTH_ROUNDS
    rounds: process.env.AUTH_ROUNDS || 10 //VECES QUE SE ENCRIPTA LA CONTRASEÑA
}