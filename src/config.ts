import * as dotenv from 'dotenv';
dotenv.config();

const config = {
    port: process.env.port || 3000,
    mongoDBUrl: process.env.MONGODB_URL || '',
};

export default config;