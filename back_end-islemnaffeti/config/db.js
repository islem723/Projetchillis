import mongoose from 'mongoose';

import { DBNAME } from './env.js';

export default function dbConnection(connectedCallBack) {
    mongoose.set('debug', true);
    mongoose.set('strictQuery', false);
    mongoose.Promise = global.Promise;

    mongoose
        .connect(`mongodb://localhost:27017/${DBNAME}`)
        .then((c) => {
            console.log(`Connected to ${c.connection.db.databaseName}`);
            connectedCallBack();
        })
        .catch((err) => console.error(err));
}
