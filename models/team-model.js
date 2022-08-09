const { Schema, model } = require('mongoose');

const TeamSchema = new Schema({
  trainers: { type: Array, required: true },
  players: { type: Array, default: [] },
  name: { type: String, required: true },
});

module.exports = model('Team', TeamSchema);
