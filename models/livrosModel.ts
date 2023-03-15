import mongoose, {Schema} from "mongoose";

const livroSchema = new Schema({
    titulo: {type : String, require: true},
    autor: {type : String, require: true},
    editora: {type : String, require: true},
    ano: {type : Number, default : 0}
});

export const livrosModel = (mongoose.models.livros ||
    mongoose.model('livros', livroSchema));