const { Schema, model } = require('mongoose');

const AccessTimeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true },
  template: { type: Schema.Types.ObjectId },
  timeoutId: { type: Number },
});

module.exports = model('AccessTimeSchema', AccessTimeSchema);
