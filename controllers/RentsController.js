const { Rent } = require('../models/index');

let authConfig = require('../config/auth');

const RentsController = {};

RentsController.newRent = async (req, res) => {

    let clientId = req.body.clientId;
    let filmId = req.body.filmId;
    let total_price = req.body.total_price;
    let max_rent_date = req.body.max_rent_date;
    let return_date = req.body.return_date;
    
    Rent.create({
        clientId: clientId,
        filmId: filmId,
        total_price: total_price,
        max_rent_date: max_rent_date,
        return_date: return_date,
    }).then(rent => {

        if(!authConfig){  
            res.send("you need to be registered");
            
        }else{
            res.send(rent);   
        };   

    }).catch((error) => {
        res.send(error);
    });
};

RentsController.listOfRents = (req, res) => {

    Rent.findAll()
    
    .then(data => {
    res.send(data);
    });
};

RentsController.getListadoFiltrado = async (req, res) => {

    let id = req.body.id;

    let consulta = `SELECT clients.name AS NombresCliente, films.title AS TituloPelicula, rents.createdAt AS FechaAlquiler
    FROM clients
    INNER JOIN rents ON clients.id = rents.clientId
    INNER JOIN films ON films.id = rents.filmId
    WHERE clientId LIKE ${id};`;

    let resultado = await Rent.sequelize.query(consulta, {
        type: Rent.sequelize.QueryTypes.SELECT
    });

    if(resultado != 0){
        res.send(resultado);
    }else {
        res.send("Busqueda incorrecta");
    };
    
}

module.exports = RentsController;