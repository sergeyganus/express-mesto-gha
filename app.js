const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const checkErrors = require('./middlewares/checkErrors');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('БД подключена'))
  .catch((err) => console.log(`Произошла ошибка: ${err.message}`));

app.use(express.json());
app.use(router);

app.use(errors());
app.use(checkErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
