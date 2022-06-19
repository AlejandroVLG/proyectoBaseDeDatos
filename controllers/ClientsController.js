
const { Client } = require('../models/index');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let authConfig = require('../config/auth');

const ClientsController = {};

ClientsController.showMember = (req, res) => {

    let documentation = req.body.dni;

    Client.findOne({
        where: { dni: documentation },

    }).then(clientFound => {
        res.send(clientFound);

    }).catch((error) => {
        res.send(error);
    });
};
ClientsController.showMembers = (req, res) => {

    Client.findAll({
        attributes: { exclude: ['password', 'rol', 'client_number', 'dni', 'createdAt', 'updatedAt'] }

    }).then(data => {
        res.send(data);

    }).catch((error) => {
        res.send(error);
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

    let attributesArray = [name, dni, email, client_number];

    
    for (let attribute of attributesArray) {

        if (attribute === "") {
            res.send("There can't be an empty fild");
        };
    };
    
    try{
        
        await Client.findOne({
            where : {dni: dni},
            where : {email: email},
            where : {client_number: client_number}
    
        }).then(newClientFound => {
    
            if (newClientFound) {
                res.send("User already exists");
                
            }else {
                Client.create({
                    name: name,
                    dni: dni,
                    password: password,
                    age: age,
                    email: email,
                    rol: rol,
                    client_number: client_number
                }).then(clientCreated => {
                    res.send(`${clientCreated.name} has been added succesfully`);
    
                }).catch((error) => {   
                    res.send(error);
                });
            };
        });
    }catch (error) {
        res.send(error);
    };    
};

ClientsController.memberLogin = (req, res) => {

    let document = req.body.dni;
    let key = req.body.password;

    Client.findOne({
        where: { dni: document }

    }).then(clientFound => {

        if (!clientFound) {
            res.send("Incorrect user name or password");
        } else {
            if (bcrypt.compareSync(key, clientFound.password)) {

                let token = jwt.sign({ user: clientFound }, authConfig.secret, {
                    expiresIn: authConfig.expires
                });

                let loginOKmessage = `Welcome back ${clientFound.name}`
                res.json({
                    loginOKmessage,
                    user: {
                        name: clientFound.name,
                        email: clientFound.email,
                        age: clientFound.age
                    },
                    token: token
                })
            };
        };
    }).catch((error) => {
        res.send(error);
    });
};

ClientsController.modifyMemberProfile = (req, res) => {

    let id = req.body.id;
    let newEmail = req.body.email;

    Client.findOne({
        where: { id: id },
    }).then(clientFound => {
        if (!clientFound) {
            res.send(`${clientFound} doesn't found`);

        } else {
            clientFound.update({
                email: newEmail
            })
            res.send(clientFound);
        };
    }).catch((error) => {
        res.send(error);
    });
};

module.exports = ClientsController;