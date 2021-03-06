/*
 * Movie Rental Service
 * Copyright (c) 2019 Luca J
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

const mongoose = require('mongoose');
const express = require('express');
const { Rental, schema } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validate = require('../middleware/validation');
const validateObjectId = require("../middleware/validateObjectId");

/**
 * Module variables.
 * @private
 */

const router = express.Router();

/**
 * Module exports.
 * @public
 */

module.exports = router;

/**
 * Routes.
 * @private
 */

router.use(auth, admin);
router.get('/', handleGet);
router.get('/:id', validateObjectId, handleGetById);
router.post('/', validate(schema), handleCreate);

/**
 * Route controllers.
 * @private
 */

async function handleGet(req, res) {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
}

async function handleGetById(req, res) {
  const rental = await Rental.findById(req.params.id);

  if (!rental) {
    return res.status(404).send('The rental with the given ID was not found.');
  }

  res.send(rental);
}

async function handleCreate(req, res) {
  const customer = await Customer.findById(req.body.customerId);

  if (!customer) {
    return res.status(400).send('Invalid customer.');
  }

  const movie = await Movie.findById(req.body.movieId);

  if (!movie) {
    return res.status(400).send('Invalid movie.');
  }

  if (movie.numberInStock === 0) {
    return res.status(400).send('Movie not in stock.');
  }

  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

  try {
    await rental.save();
    await movie.save();
    res.send(rental);
  } catch (ex) {
    res.status(500).send('Something failed');
  }
}
