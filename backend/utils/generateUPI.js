import crypto from 'crypto';

export const generateUPI = () => `${crypto.randomBytes(4).toString('hex')}@OneClickAway`;
