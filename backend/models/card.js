const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String, // имя — это строка
    required: true, // оно должно быть у каждой карточки, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  link: {
    type: String,
    required: true,
    validate: { // опишем свойство validate
      validator(v) {
        // наставник Хаз Байкулов Вам писал с уточнением, оказалось что все ок :)
        return /^(https?:\/\/(www\.)?)[\w-]+\.[\w./():,-]+#?$/.test(v);
      },
      message: (err) => `${err.value} неверный Url`, // когда validator вернёт false, будет использовано это сообщение
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: mongoose.Schema.Types.Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
