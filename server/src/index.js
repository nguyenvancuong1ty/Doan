let cors = require('cors');
const express = require('express');
const configViewEngine = require('./config/configViewEngine');
require('dotenv').config();
const path = require('path');
const apiRouter = require('./router/apiRouter');

const app = express();
const port = process.env.PORT;

app.use(cors());

app.use(express.json()); // config req.body

app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, 'public'))); //config static file

configViewEngine(app);

app.get('/', (req, res) => {
    res.send('homepage');
});

app.use('/v1/api', apiRouter);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods', 'Content-Type', 'Authorization');
    next();
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Express server listening on port ${port}`);
});
