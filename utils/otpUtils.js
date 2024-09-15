exports.generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.otpExpiration = () => {
  return Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
};
