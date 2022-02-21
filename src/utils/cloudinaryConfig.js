const cloudinary = require('cloudinary').v2;

// Configure your cloud name, API key and API secret:

const myconfig = cloudinary.config({
  cloud_name: 'aqueousbobo',
  api_key: process.env.REACT_APP_API_KEY,
  api_secret: process.env.REACT_APP_API_SECRET,
  secure: true
});

exports.myconfig = myconfig;