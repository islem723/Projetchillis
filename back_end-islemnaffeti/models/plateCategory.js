import mongoose from 'mongoose';

//utiliser schema et model du module mongoose
const { Schema, model } = mongoose;

export default model(
    'plateCategory',
    new Schema({
        categoryName: {
            type: String,
            required: true,
            trim: true,
        },
    })
);
