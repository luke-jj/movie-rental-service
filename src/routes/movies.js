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
const { Movie, schema } = require('../models/movie');
const { Genre } = require('../models/genre');
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

router.route('/')
  .get(handleGet)
  .post([auth, admin, validate(schema)], handleCreate);

router.route('/:id')
  .get(validateObjectId, handleGetById)
  .put([auth, admin, validateObjectId, validate(schema)], handleUpdate)
  .delete([auth, admin, validateObjectId], handleDelete);

/**
 * Route controllers.
 * @private
 */

async function handleGet(req, res) {
  const movies = await Movie.find().sort('name');
  res.send(movies);
}

async function handleGetById(req, res) {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    return res.status(404).send('Movie with given id not found.');
  }

  res.send(movie);
}

async function handleCreate(req, res) {
  const genre = await Genre.findById(req.body.genreId);

  if (!genre) {
    return res.status(400).send('Invalid genre.');
  }

  const movie = new Movie({
    title: req.body.title,
    tagline: req.body.tagline,
    description: req.body.description,
    rating: req.body.rating,
    imdbId: req.body.imdbId,
    genre: { _id: genre._id, name: genre.name },
    posterUrl: req.body.posterUrl,
    posterPath: req.body.posterPath,
    backdropPath: req.body.backdropPath,
    releaseDate: req.body.releaseDate,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  await movie.save();
  res.send(movie);
}

async function handleUpdate(req, res) {
  const genre = await Genre.findById(req.body.genreId);

  if (!genre) {
    return res.status(400).send('Invalid genre.');
  }

  const movie = await Movie.findByIdAndUpdate(req.params.id,
    {
      title: req.body.title,
      tagline: req.body.tagline,
      description: req.body.description,
      rating: req.body.rating,
      imdbId: req.body.imdbId,
      genre: { _id: genre._id, name: genre.name },
      posterUrl: req.body.posterUrl,
      posterPath: req.body.posterPath,
      backdropPath: req.body.backdropPath,
      releaseDate: req.body.releaseDate,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    },
    { new: true });

  if (!movie) {
    return res.status(404).send('Movie with given id not found.');
  }

  res.send(movie);
}

async function handleDelete(req, res) {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie) {
    return res.status(404).send('Movie with given id not found.');
  }

  res.send(movie);
}
