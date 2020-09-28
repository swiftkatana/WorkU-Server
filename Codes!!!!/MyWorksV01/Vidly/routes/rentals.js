const { validate, Rental } = require("../models/rental");
const { Movie } = require('../models/movie');
const { User } = require('../models/user');
const Fawn = require('fawn');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);



router.get('/', async(req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);

});

router.post('/', async(req, res) => {
    const { eror } = validate(req.body);
    if (eror) return res.status(400).send(eror.details[0].message);


    if (!mongoose.Types.ObjectId.isValid(req.body.userId))
        return res.status(400).send("invalid user.");

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send('invalid customer');


    if (!mongoose.Types.ObjectId.isValid(req.body.movieId))
        return res.status(400).send("invalid movie.");

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('invalid movie');


    if (movie.numberInStock === 0) return res.status(400).send('Movie  not in stock');


    const rental = new Rental({
        customer: {
            _id: user._id,
            name: user.name,
            phone: user.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRenalRate: movie.dailyRenalRate
        }
    });
    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 }
            })
            .run();
    } catch (error) {
        res.status(500).send('something failed.');
    };




    res.send(rental);


})

module.exports = router;