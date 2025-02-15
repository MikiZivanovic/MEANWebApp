const moongose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const crypto = require('crypto');
const { type } = require('os');


const userSchema = new moongose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    minlength: [4, 'Name must have more than 5 chars'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Email is not in the good format'],
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },

  password: {
    type: String,
    required: true,
    minlength: [5, 'Password must have more than 5 chars'],
    select: false,
  },
  
  passwordChangedAt: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  activ: {
    type: Boolean,
    default: true,
  },
});
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  if (
    (this.isModified('resetPasswordToken') &&
      this.resetPasswordToken != undefined) ||
    (this.isModified('resetPasswordExpires') &&
      this.resetPasswordExpires != undefined)
  ) {
    return next();
  }

  this.passwordChangedAt = Date.now() - 1000;
  next();
});
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcryptjs.hash(this.password, 12);
  
  next();
});
userSchema.pre(/^find/, function (next) {
  this.find({ activ: { $ne: false } });
  next();
});
userSchema.methods.comparePasswords = async function (unetaSifra, pravaSifra) {
  return await bcryptjs.compare(unetaSifra, pravaSifra);
};
userSchema.methods.changePasswords = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const vremePromene = parseInt(this.passwordChangedAt.getTime() / 1000);
    return JWTTimeStamp < vremePromene;
  }

  return false;
};
userSchema.methods.resetPasswordFuncionality = function () {
  let resetToken = crypto.randomBytes(32).toString('hex');
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = moongose.model('User', userSchema);

module.exports = User;
