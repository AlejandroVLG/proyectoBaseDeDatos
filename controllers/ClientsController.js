
const { Client } = require('../models/index');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let authConfig = require('../config/auth');

const ClientsController = {};

ClientsController.showMember = (req, res) => {

    let documentation = req.body.dni;

    Client.findOne({
        where : {dni : documentation},

    }).then(clientFound =>{
        res.send(clientFound);
    });
};
ClientsController.showMembers = (req, res) => {

    Client.findAll({
        attributes: {exclude: ['password','rol','client_number','dni','createdAt','updatedAt']}

    }).then(data =>{
        res.send(data);
    });
};

ClientsController.newMember = async (req, res) => {

    let name = req.body.name;
    let dni = req.body.dni;
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
    let age = req.body.age;
    let email = req.body.email;
    let rol = req.body.rol;
    let client_number = req.body.client_number;


    Client.create({
        name: name,
        dni: dni,
        password: password,
        age: age,
        email: email,
        rol: rol,
        client_number: client_number
    }).then(client => {
        res.send(`${client.name}, you have been added succesfully`);

    }).catch((error) => {
        res.send(error);
    });
};

ClientsController.memberLogin = (req, res) => {

    let document = req.body.dni;
    let key = req.body.password;

    Client.findOne({
        where : {dni : document}

    }).then(clientFound => {

        if(!clientFound){
            res.send("Usuario o password incorrectos");
        } else {
            if( bcrypt.compareSync(key, clientFound.password)){

                let token = jwt.sign({ user: clientFound }, authConfig.secret, {
                    expiresIn: authConfig.expires
                });
                
                let loginOKmessage = `Welcome again ${clientFound.name}`
                res.json({
                    loginOKmessage,
                    user: {
                        name:clientFound.name,
                        email:clientFound.email,
                        age:clientFound.age
                    },
                    token: token
                })
            };
        };
    }).catch(err => console.log(err));
};

//Export
module.exports = ClientsController;