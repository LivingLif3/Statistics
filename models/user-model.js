const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  img: { type: String, required: false, default: null },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  role: { type: String, default: 'USER' },
  team: { type: Schema.Types.ObjectId, required: false, default: null },
  available: { type: Number, default: 0 },
  age: { type: Number },
  height: { type: Number },
  weight: { type: Number },
});

module.exports = model('User', UserSchema);
