const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const { RESOURCE_NOT_FOUND_STATUS_CODE } = require('./utils/statusCodes');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('БД подключена'))
  .catch((err) => console.log(`Произошла ошибка: ${err.message}`));

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64b30f35fecbf505ed8014a7'
  };

  next();
});
app.use(router);
app.use('*', (req, res) => {
  res.status(RESOURCE_NOT_FOUND_STATUS_CODE).send({ message: 'Запрошенная страница не найдена' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
