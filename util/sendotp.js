const axios = require('axios');

const sendOTP = async ({ OTP, phoneNumber }) => {
  const apistring = `http://api.msg91.com/api/v2/sendsms?authkey=${
    process.env.AUTH_KEY
  }&mobiles=${phoneNumber}&message=${
    'Your OTP is' + OTP
  }&sender=MSGIND&route=4&country=91`;
  try {
    const response = await axios.get(apistring);
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendOTP;
