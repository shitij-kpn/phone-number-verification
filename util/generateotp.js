function getOTP() {
  let otp = Math.random();
  otp = otp * 1000000;
  otp = parseInt(otp);
  return 4000;
}

module.exports = getOTP;
