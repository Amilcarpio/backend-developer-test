import express, { json, urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import pkg from '@bugsnag/js';
import apiRouter from './routes/api.js'
import BugsnagPluginExpress from '@bugsnag/plugin-express'

const { start, getPlugin } = pkg;

const app = express()

app.use(cors())

app.use(json())

app.use(urlencoded({ extended: false, limit: '50mb' }))
app.use(cookieParser())

app.use('/api', apiRouter)

start({
  apiKey: '699c7f4233eae42439af176b4f40b6f4',
  plugins: [BugsnagPluginExpress]
})

var middleware = getPlugin('express')
app.use(middleware.requestHandler)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });

// error handler
app.use(function(err, req, res, next) {
// set locals, only providing error in development
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
res.status(err.status || 500);
res.render('error');
});
  
// This handles any errors that Express catches
app.use(middleware.errorHandler)

export default app


