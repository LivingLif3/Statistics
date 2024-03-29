const { Schema, model } = require('mongoose');

const QuestionModel = new Schema(
  {
    quiz: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    questionTemplate: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model('Question', QuestionModel);
