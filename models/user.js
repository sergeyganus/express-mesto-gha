const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AuthenticationError = require('../utils/errors/AuthenticationError');
const { emailRegExp, urlRegExp } = require('../utils/regexps');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле email должно быть заполнено'],
    unique: [true, 'Поле email не должно повторяться'],
    validate: {
      validator: (email) => emailRegExp.test(email),
      message: 'Некорректный адрес эл. почты для поля email'
    }
  },
  password: {
    type: String,
    required: [true, 'Поле password должно быть заполнено'],
    minlength: [8, 'Минимальная длина поля password - 8 символов'],
    select: false
  },
  name: {
    type: String,
    maxlength: [30, 'Максимальная длина поля name - 30 символов'],
    default: 'Жак-Ив Кусто'
  },
  about: {
    type: String,
    maxlength: [30, 'Максимальная длина поля about - 30 символов'],
    default: 'Исследователь'
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (url) => urlRegExp.test(url),
      message: 'Некорректный адрес URL для поля avatar'
    }
  }
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthenticationError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthenticationError('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
