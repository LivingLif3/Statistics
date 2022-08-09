const { Schema, model } = require('mongoose');

const QuizTemplateSchema = new Schema({
  questions: [
    {
      question: {
        type: Schema.Types.ObjectId,
        ref: 'QuestionTemplate',
      },
    },
  ],
  title: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  custom: {
    type: Boolean,
    default: false,
  },
});

module.exports = model('QuizTemplate', QuizTemplateSchema);
