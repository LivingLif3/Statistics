const { Schema, model } = require('mongoose');

const CustomQuestionAnswerModel = new Schema(
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

module.exports = model('CustomQuestionAnswerModel', CustomQuestionAnswerModel);
