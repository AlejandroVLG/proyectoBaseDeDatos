const { Film } = require('../models/index');

const FilmsController = {};

FilmsController.getFilms = (req, res) => {
    Film.findAll()
    .then(data => {
    
        res.send(data)
    });
};

FilmsController.postFilm = async (req, res) => {

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

module.exports = FilmsController;