import express, { json, urlencoded } from 'express'
import createError from 'http-errors'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import apiRouter from './routes/api.js'
import syncDatabase from './database/syncDatabase.js'

const app = express()

app.use(cors())

app.use(json())

app.use(urlencoded({ extended: false, limit: '50mb' }))
app.use(cookieParser())

app.use('/api', apiRouter)

app.use(function(req, res, next) {
    next(createError(404));
  });

app.use(function(err, req, res, next) {
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};

res.status(err.status || 500);
res.render('error');
});

syncDatabase().then(() => {
    app.listen(3000, () => {
        console.log('Server running on port 3000')
    })
}).catch((error) => {
    console.log('error'+error)
})



