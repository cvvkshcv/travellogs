const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const middleWare = require('./configs/middleware');
const mongoose = require('mongoose');
require('dotenv').config();

// routes
const logsRouter = require('./routes/logs');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser : true, useUnifiedTopology: true })


const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet())
app.use(cors({
    origin : process.env.NODE_ENV == 'production' ? '*' : process.env.CORS_ORIGIN
}));

app.use('/api/logs', logsRouter);
app.use(middleWare.notFound);
app.use(middleWare.errorHandler);

app.listen(process.env.PORT, () => {
    console.log('Listening to port : ' + process.env.PORT);
});