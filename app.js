const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const { RESOURCE_NOT_FOUND_STATUS_CODE } = require('./utils/statusCodes');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('БД подключена'))
  .catch((err) => console.log(`Произошла ошибка: ${err.message}`));

app.use(express.json());
app.use(router);
app.use('*', (req, res) => {
  res.status(RESOURCE_NOT_FOUND_STATUS_CODE).send({ message: 'Запрошенная страница не найдена' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
