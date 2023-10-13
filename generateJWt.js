const crypto = require('crypto');

// Generate a secure JWT private key (256 bits)
const privateKey = crypto.randomBytes(32).toString('hex');

console.log('JWT Private Key:', privateKey);
