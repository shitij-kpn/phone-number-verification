require('dotenv').config({ path: './config.env' });

const port = process.env.PORT || 3000;
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const getOTP = require('./util/generateotp');
const { writeData, checkPhoneNumber } = require('./db/database');
const sendOTP = require('./util/sendotp');

app.use(cors());

let otp = {};

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', async (req, res) => {
  const phoneNumber = req.body['phone-number'];
  console.log({ phoneNumber });
  await checkPhoneNumber(phoneNumber);
  const OTP = getOTP();
  otp = { phoneNumber, OTP };
  await sendOTP(otp);
  res.redirect('/verify');
});

app.get('/verify', (req, res) => {
  res.render('verify');
});

app.post('/verify', async (req, res) => {
  console.log(req.body);
  if (req.body['otp'] == otp.OTP) {
    res.send('verified');
    await writeData(otp.phoneNumber);
    otp = {};
  } else {
    res.send('liar');
  }
});

app.listen(port, () => {
  console.log('started');
});
