const { Schema, model } = require('mongoose');

const QuestionAnswerModel = new Schema(
  {
    quiz: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    answers: {
      type: Array,
      required: true,
    },
    avarageAnswer: {
      type: Number,
      required: true,
    },
    template: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    quizCollection: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model('QuestionAnswer', QuestionAnswerModel);
