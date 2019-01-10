const crypto = require('crypto')
con

// Hash function
// JSON stringify to get unique entry and track all changes, especially needed for objects
// Return a unique hexadecimal based on the inputs
// If one character change in the inputs a new unique hash will be generated
const cryptoHash = (...inputs) => {
  const hash = crypto.createHash('sha256');

  hash.update(inputs.map(input => JSON.stringify(input)).sort().join(' '));

  return hash.digest('hex');
}

module.exports = cryptoHash;