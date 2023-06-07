const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());
//middlewares
app.use(morgan("dev"))

// ROUTES

const userRoute = require('./api/routes/user');
app.use('/user',userRoute);


const citasRoute = require('./api/routes/citas');
app.use('/citas', citasRoute)


const dentistasRoute = require('./api/routes/dentistas');
app.use('/dentistas', dentistasRoute)

const pacientesRoute = require('./api/routes/pacientes');
app.use('/pacientes', pacientesRoute)



module.exports = app;