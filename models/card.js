const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле name должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля name - 2 символа'],
    maxlength: [30, 'Максимальная длина поля name - 30 символов']
  },
  link: {
    type: String,
    required: [true, 'Поле name должно быть заполнено'],
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Некорректный адрес URL для поля link'
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: []
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('card', cardSchema);
