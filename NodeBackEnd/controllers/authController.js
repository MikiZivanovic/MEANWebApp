const User = require('./../models/userModel');
const jwb = require('jsonwebtoken');
const AppError = require("../utils/appError")
const { promisify } = require('util');

const crypto = require('crypto');
 
const createAndSendToken = (user, res, statusCode) => {
  const token = createToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    
    sameSite: "lax",
  };
 
  user.password = undefined;
  res.cookie('jwt', token, cookieOptions);
  res.status(statusCode).json({
    
    token,
    user
  });
};
 
exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if(req.cookies.jwt){
    console.log(req.cookies.jwt)
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(new AppError('Nisi ulogovan', 401));
  }
  console.log(token);
 
  const decoded = await promisify(jwb.verify)(token, process.env.secret);
 
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    res.status(401).json({
      status: 'failed',
      message: 'Nepostoji User sa ovim IDijem u bazi',
    });
  }
  if (freshUser.changePasswords(decoded.iat)) {
    res.status(401).json({
      status: 'failed',
      message: 'Ne mozete da pristupite sa starim tokenom',
    });
  }
  req.user = freshUser;
  next();
};
 
const createToken = (id) => {
  return jwb.sign({ id }, process.env.secret, {
    expiresIn: '9d',
  });
};
 
exports.signup = async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
  });
  createAndSendToken(newUser, res, 200);
};
 
exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return next(new AppError('Please enter email or password', 404));
  }
  const user = await User.findOne({ email: email }).select('+password');
  console.log(user);
  if (!user || !(await user.comparePasswords(password, user.password))) {
    return next(new AppError('Password or email not valid', 404));
  }
  createAndSendToken(user, res, 200);
};
exports.getMe = async (req, res, next) => {
  try {
    
    const token = req.cookies.jwt;
    
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Niste prijavljeni!",
      });
    }

    
    const decoded = await promisify(jwb.verify)(token, process.env.SECRET);

  
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: "fail",
        message: "Korisnik sa ovim ID-jem više ne postoji.",
      });
    }

    
    if (currentUser.changePasswords && currentUser.changePasswords(decoded.iat)) {
      return res.status(401).json({
        status: "fail",
        message: "Lozinka je promenjena, molimo da se ponovo prijavite.",
      });
    }
    console.log(currentUser)
 
    res.status(200).json({
    
      user: {
        id: currentUser._id,
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role,
      },
    });
  } catch (error) {
    console.log( error.message)
    res.status(500).json({
      status: "error",
      message: "Došlo je do greške prilikom validacije tokena.",
      error: error.message,
    });
  }
};

exports.permision = (...arr) => {
  return (req, res, next) => {
    if (!arr.includes(req.user.role)) {
      return next(
        new AppError("You don't have permission to do these action", 401)
      );
    }
    next();
  };
};
exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('The user with these email does not exist ', 404));
  }

  const resetToken = user.resetPasswordFuncionality();
  await user.save({ validateBeforeSave: false });
 
  
  const tokenUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot password?Submit a patch request with your new password and confirmpassword to url:${tokenUrl}.\nIf you did not forgot your password please ignore these email`;
  const emailoptions = {
    email: user.email,
    subject: 'Your password reset token(valid for 10  min)',
    message,
  };
  try {
    await sendEmail(emailoptions);
 
    res.status(200).send({
      status: 'Succes',
      message: 'Resettoken has been sent',
    });
  } catch (error) {
    console.log(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
  }
};
exports.resetPassword = async (req, res, next) => {
  const hashToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
 
  const user = await User.findOne({
    resetPasswordToken: hashToken,
    resetPasswordExpires: { $gt: Date.now() },
  });
 
  if (!user) {
    return next(new AppError('The token is not valid or expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  const token = createToken(user._id);
  res.status(200).json({
    status: 'succes',
    token: token,
  });
};
exports.update = async (req, res, next) => {
 
 
  const user = await User.findOne({ _id: req.user._id });
 

  if (!user.comparePasswords(req.body.passwordCurrent, req.user.password)) {
    return next(new AppError('Pogresna sifra trenutnog usera', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
 
  createAndSendToken(user, res, 200);
};