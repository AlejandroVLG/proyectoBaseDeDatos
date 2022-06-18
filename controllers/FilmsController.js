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
        res.send(`${film.title}, you have been added succesfully`);

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
            res.send("That film doesn't exist");

        }else{
            res.send(searchResult);
        };
    });
};
FilmsController.removeFilm = (req, res) => {

    let id = req.body.id;

    Film.findOne({
        where : {id : id},
    }).then(filmFound => {
        if(!filmFound){
            res.send("Film doesn't found");

        }else{
            filmFound.destroy({
            })
            res.send(filmFound);
        };
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
    })
    
    
}
module.exports = FilmsController;