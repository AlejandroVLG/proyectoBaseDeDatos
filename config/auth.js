require('dotenv').config();
module.exports = {
    //secret: process.env.AUTH_SECRET,
    secret: process.env.AUTH_SECRET || "pimpamtomalacasitos", 

    //expires: process.env.AUTH_EXPIRES,
    expires: process.env.AUTH_EXPIRES || "12h", 
    //rounds: process.env.AUTH_ROUNDS
    rounds: process.env.AUTH_ROUNDS || 10 
}