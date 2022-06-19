const { Film } = require('../models/index');

const FilmsController = {};

FilmsController.showFilmsList = (req, res) => {
    Film.findAll()
    .then(data => {
    
        res.send(data);
    });
};

FilmsController.addNewFilm = async (req, res) => {

    let title = req.body.title;
    let genre = req.body.genre;
    let recomended_age = req.body.recomended_age;
    let duration = req.body.duration;
    let director = req.body.director;
    let year = req.body.year;
    let price = req.body.price;

    Film.create({
        title: title,
        genre: genre,
        recomended_age: recomended_age,
        duration: duration,
        director: director,
        year: year,
        price: price
    }).then(film => {
        res.send(`${film.title} has been added succesfully`);

    }).catch((error) => {
        res.send(error);
    });
};
FilmsController.searchFilmTitle = async (req, res) => {

    let title = req.body.title;

    Film.findOne({
        where : { title : title}
    })

    .then(searchResult => {
        if(!searchResult){
            res.send(`There isn't any film in the database called ${searchResult}`);

        }else{
            res.send(searchResult);
        };
    }).catch((error) => {
        res.send(error);
    });
};
FilmsController.removeFilm = (req, res) => {

    let id = req.body.id;

    Film.findOne({
        where : {id : id},
    }).then(filmFound => {
        if(!filmFound){
            res.send(`There isn't any film in the database called ${filmFound}`);

        }else{
            filmFound.destroy({
            })
            res.send(filmFound);
        };
    }).catch((error) => {
        res.send(error);
    });
}

FilmsController.directorFilter = (req, res) => {

    let director = req.body.director;

    Film.findAll({
        where : { director : director}

    }).then(directorFound => {
        if(!director){
            res.send(`There isn't any movie on the database directed by ${directorFound}`);

        }else{
            res.send(directorFound);
        };
    }).catch((error) => {
        res.send(error);
    });
};

FilmsController.searchFilmByRecomendedAge = async (req, res) => {

    let recomended_age = req.body.recomended_age;

    let query = `SELECT * FROM videoclubPremium.films WHERE recomended_age <= ${recomended_age}`;

    let ageFilter = await Film.sequelize.query(query, {
        type: Film.sequelize.QueryTypes.SELECT 
    });

    if(ageFilter != 0){
        res.send(ageFilter);
    }else{
        res.send("There isn't any movie recommended for that age");
    };
}
FilmsController.searchFilmByPrice = async (req, res) => {

    let price = req.body.price;

    let query = `SELECT * FROM videoclubPremium.films WHERE price <= ${price}`;

    let priceFilter = await Film.sequelize.query(query, {
        type: Film.sequelize.QueryTypes.SELECT 
    });

    if(priceFilter != 0){
        res.send(priceFilter);
    }else{
        res.send("There isn't any movie with that price or below");
    };
}
module.exports = FilmsController;