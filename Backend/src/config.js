import dotenv from 'dotenv';

dotenv.config();

const config = {
    DB: {
        DB_URI: process.env.DB_URI,
    },
    SERVER: {
        PORT: process.env.PORT
    },

};

export default config;