import mongoose from 'mongoose';

//utiliser schema et model du module mongoose
const { Schema, model } = mongoose;

export default model(
    'menu',
    new Schema({
        platname: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        plateCategory: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'plateCategory',
        },
    })
);
