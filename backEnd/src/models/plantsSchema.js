import mongoose from "mongoose";

const plantSchema = new mongoose.Schema ({
    idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    imagePlant: {type: String, required: false},
    

});

export default mongoose.model ('Plant', plantSchema);