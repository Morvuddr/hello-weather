const express = require('express');
const debug = require('debug')('index');
const morgan = require('morgan');
const cors = require('cors');

const { favoritesRouter } = require('./src/favoritesRouter');
const { weatherRouter } = require('./src/weatherRouter');

const port = process.env.PORT || 3001;
const app = express();

app.use(cors())
app.use(morgan('combined'));
app.use(express.json());
app.use('/api/favorites', favoritesRouter);
app.use('/api/weather', weatherRouter);

app.listen(port, () => {
    debug(`Listening on port ${port}`);
});