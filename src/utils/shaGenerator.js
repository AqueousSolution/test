var crypto = require("crypto");

function shaGenerator(value) {
  return crypto.createHash('sha1').update(JSON.stringify(value))
  // sha.digest(value);
}

export default shaGenerator