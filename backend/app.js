require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/logger');
const router = require('./routes/routes');
const { developDataBaseUrl } = require('./utils/config');

const { PORT = 3001, NODE_ENV, DATA_BASE_URL } = process.env;

const app = express();

app.use(express.json());

mongoose.connect(NODE_ENV === 'production' ? DATA_BASE_URL : developDataBaseUrl);

app.listen(PORT);

const corsOptions = {
  origin: ['http://localhost:3000', 'https://localhost:3000', 'http://localhost:3001', 'https://localhost:3001'],
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
