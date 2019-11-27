const express = require('express');
const debug = require('debug')('favoritesRouter');

const favoritesRouter = express.Router();

favoritesRouter.route('/').get((req, res) => {
   res.json([
       'Moscow',
       'Kemerovo'
       ]);
});

exports.favoritesRouter = favoritesRouter;