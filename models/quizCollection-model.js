const { Schema, model } = require('mongoose');

const QuizCollectionModel = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    quizes: { type: Array, required: true },
    template: {
      type: Schema.Types.ObjectId,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model('QuizCollection', QuizCollectionModel);
