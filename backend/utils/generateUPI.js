import crypto from 'crypto';

const generateUPI = () => `${crypto.randomBytes(4).toString('hex')}@fastpay`;

export default generateUPI;
