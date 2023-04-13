import * as dotenv from 'dotenv';
dotenv.config();

const config = {
    port: process.env.port || 3001,
    mongoDBUrl: process.env.MONGODB_URL || '',
    tokenKey: process.env.TOKEN_KEY || '',
};

export default config;