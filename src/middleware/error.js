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

const winston = require('winston');

/**
 * Module exports.
 * @private
 */

module.exports = (err, req, res, next) => {
  winston.log('error', err.message, err);
  res.status(500).send('An unexpected error occured on the server');
};
