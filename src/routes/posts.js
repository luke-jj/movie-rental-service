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
const { Post, schema } = require('../models/post');
const auth = require('../middleware/auth');
const validate = require('../middleware/validation');
const validateObjectId = require('../middleware/validateObjectId');

/**
 * Module variables.
 * @private
 */

const router = express.Router({ mergeParams: true });

/**
 * Module exports.
 * @public
 */

module.exports = router;

/**
 * Routes.
 * @private
 */

router.get('/', handleGet);
router.get('/:postid', handleGetById);
router.post('/', [auth, validate(schema)], handleCreate);
router.put('/:postid', auth, validate(schema), handleUpdate);
router.delete('/:postid', auth, handleDelete);

/**
 * Route controllers.
 * @private
 */

async function handleGet(req, res) {
  res.send(`hi from posts router. threadid: ${req.params.id}`);
  // const posts = await Post.find().sort('date');
  // res.send(posts);
}

async function handleGetById(req, res) {
  // const thread = await Thread.findById(req.params.id);

  // if (!thread) {
    // return res.status(404).send('Review with given id not found.');
  // }

  // res.send(thread);
}

async function handleCreate(req, res) {
  // const thread = new Thread({
    // title: req.body.title,
    // text: req.body.text,
    // repliesCount: 0,
    // user: {
      // _id: req.user._id,
      // name: req.user.name
    // }
  // });
  // await thread.save();
  // res.send(thread);
}

async function handleUpdate(req, res) {
  // const thread = await Thread.findById(req.params.id);

  // if (!thread) {
    // return res.status(404).send('Thread with given id not found.');
  // }

  // if (!req.user.isAdmin && thread.user._id !== req.user._id) {
    // return res.status(403).send('Not authorized or not original poster.');
  // }

  // thread.title = req.body.title;
  // thread.text = req.body.text;

  // await thread.save();
  // res.send(thread);
}

async function handleDelete(req, res) {
  // const thread = await Thread.findById(req.params.id);

  // if (!thread) {
    // return res.status(404).send('Thread with given id not found.');
  // }

  // if (!req.user.isAdmin && thread.user._id !== req.user._id) {
    // return res.status(403).send('Not authorized or not original poster.');
  // }

  // const result = await Thread.deleteOne({ _id: thread._id });

  // if (result) {
    // return res.send(thread);
  // }

  // res.status(500).send('Error deleting thread.');
}