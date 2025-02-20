require('dotenv').config();

const domain = process.env.NEXT_PUBLIC_DOMAIN;
const secure = process.env.NEXT_PUBLIC_SECURE === 'true';
const port = process.env.NEXT_PUBLIC_PORT;

export {domain, secure, port}