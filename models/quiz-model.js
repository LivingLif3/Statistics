const { Schema, model } = require('mongoose');

const QuizModel = new Schema(
  {
    questions: {
      type: Array,
      required: true,
    },
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
    answered: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    repeat: {
      type: Boolean,
      default: false,
    },
    end: {
      type: Boolean,
      default: false,
    },
    template: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    quizCollection: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    custom: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model('Quiz', QuizModel);
