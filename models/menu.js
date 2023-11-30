import mongoose from "mongoose";

//utiliser schema et model du module mongoose
const { Schema, model } = mongoose;

const menuSchema = new Schema({
  platname: { type: String, required: true },

  title: { type: String },

  image: {
    type: String,
  },
  
  price: {
    type: Number,
  },
});

export default model("menu", menuSchema);
