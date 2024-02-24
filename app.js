const express = require('express');
const bodyParser = require('body-parser')
const createError = require('http-errors');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const apiRouter = require('./routes/api.js');
const syncDatabase = require('./database/syncDatabase.js');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backend jobs and companies lists API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

const app = express();

app.use(cors());

app.use(express.json());

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(req.body);
  next();
});

app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());

app.use('/api', apiRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(function(req, res, next) {
    next(createError(404));
});

/**
 * Synchronizes the database and starts the server.
 * 
 * The `syncDatabase` function is called with the parameter `true`, which means that the database synchronization
 * will occur without forcing the recreation of tables.
 * 
 * After successful synchronization of the database, the server starts listening on port 3000.
 * 
 * If an error occurs during synchronization, it will be caught and logged to the console.
 * 
 * Please, after run for the first time the server, change the parameter to `false` to avoid data loss.
 * 
 * @function
 * @name syncDatabase
 * @param {boolean} force - If `true`, forces the recreation of tables. If `false`, just synchronizes the database.
 * @returns {Promise} Returns a promise that resolves when the database synchronization is completed.
 */
syncDatabase(false).then(() => {
    app.listen(3000, () => {
        console.log('Server running on port 3000')
    })
}).catch((error) => {
    console.log('error'+error)
});