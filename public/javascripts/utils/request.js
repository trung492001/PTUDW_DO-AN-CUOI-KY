const axios = require('axios');

async function get(uri, cb) {
  try {
    const response = await axios.get(uri);
    cb(null, response.data);
  } catch (error) {
    cb(error, null);
    console.log(error);
  }
}

async function post(uri, payload, cb) {
  try {
    const response = await axios.post(uri, payload);
    cb(null, response.data);
  } catch (error) {
    cb(error, null);
    console.log(error);
  }
}

module.exports = {
  get,
  post
}