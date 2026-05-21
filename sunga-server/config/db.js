const mongoose = require('mongoose');

const connectDB = async () => {
    // Connect MongoDB Atlas using the URI from environment variables.
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }

        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        console.warn('MongoDB is unavailable. Server will keep running for local frontend testing.');
    }
};

module.exports = connectDB;
