const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

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
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
