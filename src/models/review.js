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

const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const { movieSchema } = require('./movie.js');
const { genreSchema } = require('./genre.js');

const schema = Joi.object({
  title: Joi.string().min(2).max(255).required(),
  movieId: Joi.objectId().required(),
  text: Joi.string().min(20).max(8192).required(),
});

const Review = mongoose.model('Reviews', mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 255
  },
  user: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
      },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true
      },
      genre: {
        type: genreSchema,
        required: true
      },
    }),
    required: true,
  },
  text: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 8192
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
}));

/**
 * Module exports.
 * @private
 */

module.exports = {
  schema,
  Review
};
