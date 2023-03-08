import * as dotenv from 'dotenv';
dotenv.config();

const config = {
    mongoDBUrl: process.env.MONGODB_URL,
};

export default config;