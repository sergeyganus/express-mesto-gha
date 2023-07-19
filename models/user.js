const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле name должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля name - 2 символа'],
    maxlength: [30, 'Максимальная длина поля name - 30 символов']
  },
  about: {
    type: String,
    required: [true, 'Поле about должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля about - 2 символа'],
    maxlength: [30, 'Максимальная длина поля about - 30 символов']
  },
  avatar: {
    type: String,
    required: [true, 'Поле avatar должно быть заполнено'],
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Некорректный адрес URL для поля avatar'
    }
  }
});

module.exports = mongoose.model('user', userSchema);
