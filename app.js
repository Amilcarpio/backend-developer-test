const express = require('express');
const createError = require('http-errors');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const apiRouter = require('./routes/api.js');
const syncDatabase = require('./database/syncDatabase.js');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());

app.use('/api', apiRouter);

app.use(function(req, res, next) {
    next(createError(404));
});

syncDatabase().then(() => {
    app.listen(3000, () => {
        console.log('Server running on port 3000')
    })
}).catch((error) => {
    console.log('error'+error)
});