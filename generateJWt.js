const crypto = require('crypto');
const logger = require('./utils/logger');
// Generate a secure JWT private key (256 bits)
const privateKey = crypto.randomBytes(32).toString('hex');

logger.info('JWT Private Key:', privateKey);
