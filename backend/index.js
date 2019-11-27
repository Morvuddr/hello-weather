const express = require('express');
const debug = require('debug')('index');
const morgan = require('morgan');

//const { favoritesRouter } = require('./favoritesRouter');
const { weatherRouter } = require('./weatherRouter');

const port = process.env.PORT || 3001;
const app = express();

app.use(morgan('combined'));
app.use(express.json());
//app.use('/api/favorites', favoritesRouter);
app.use('/api/weather', weatherRouter);

app.listen(port, () => {
    debug(`Listening on port ${port}`);
});