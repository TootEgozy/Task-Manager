import * as dotenv from 'dotenv';
dotenv.config();

const config = {
    port: process.env.port || 3001,
    mongoDBUrl: process.env.MONGODB_URL || '',
};

export default config;