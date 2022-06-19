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

/* FilmsController.searchFilmByRecomendedAge = (req, res) => {

    let recomended_age = req.body.recomended_age;

    for(let i = 1; i <= recomended_age; i++){

        let count = i;

        Film.find({
            where : {recomended_age : count}
                
        }).then(data => {        
            res.send(data);
        });        
    };
}; */

module.exports = FilmsController;