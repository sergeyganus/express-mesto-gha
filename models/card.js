const mongoose = require('mongoose');
const NotFoundError = require('../errors/NotFoundError');
const { urlRegExp } = require('../utils/regexps');

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
      validator: (url) => urlRegExp.test(url),
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
}, { versionKey: false });

cardSchema.statics.findCardById = function (cardId) {
  return this.findById(cardId)
    .orFail(() => new NotFoundError('Карточки с указанным _id не существует'))
    .then((card) => card);
};

module.exports = mongoose.model('card', cardSchema);
