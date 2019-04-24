const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    active: Boolean,
    phone: { type: String, required: true },
    roles: [{ type: String, required: true }],
  },
  { collection: 'users', autoIncrement: false }
);
UserSchema.plugin(mongoosePaginate);

// Custom methods
UserSchema.method.findByEmail = function(email) {
  return this.find({ email });
};

module.exports = mongoose.model('User', UserSchema);
