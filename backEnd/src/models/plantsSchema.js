import mongoose from "mongoose";

const medicine = new mongoose.Schema ({
    nameMedication:  {type: String, required: true},
    restrictionType: {type: String, required: true},
    frequency: {type: Number, required: true},
    dateStartTreatment: { type: Date, required: true, default: Date.now },
    dateEndTreatment: {type: Date, required: false},
    successUse: {type: Boolean, required: false},
});

const sickPlant = new mongoose.Schema ({
    status: {type: Boolean, required: true},
    imagePrage: {type: String, required: false},
    namePrague: {type: String, required: false},
    medicineUsed: [medicine]

});

const plantSchema = new mongoose.Schema ({
    idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    imagePlant: {type: String, required: false},
    namePlant: {type: String, required: true},
    spicie: {type: String, required: false},
    typePlant: {type: String, required: false}, //Frutifera, Florifera ou hortaliças ...
    localization: {type: String, required: true},
    watering: {type: Number, required: true}, //Intervalo de dias
    typeSun: {type: String, required: true},
    lastWatering: {type: Date, required: false},
    sick: sickPlant
}, {
    timestamps: true // Adiciona createdAt e updatedAt
}

);

export default mongoose.model ('Plant', plantSchema);