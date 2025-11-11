import mongoose from "mongoose";

// --- Subdocumento de Preço (Reutilizável) ---
const priceSchema = new mongoose.Schema({
    purchaseDate: { type: Date, required: true },
    shop: { type: String, required: true },
    value: { type: Number, required: false }, // Float
}, { _id: false });

// --- Subdocumento de Banho/Tosa ---
const bathSchema = new mongoose.Schema({
    nameLocal: { type: String, required: true },
    phone: { type: String, required: true },
    frequency: { type: Number, required: true }, // Em semanas
    grooming: { type: Boolean, required: true }, // Tosa/Grooming (Sim/Não)
    priceBath: [priceSchema] // Usando o schema de Preço
}, { _id: false });

// --- Subdocumento de Informações do Veterinário ---
const doctorSchema = new mongoose.Schema({
    nameDoctor: { type: String, required: true },
    phone: { type: String, required: true },
    nameVeterinarian: { type: String, required: true }
}, { _id: false });

// --- Subdocumento de Consulta Médica ---
const doctorAppointmentSchema = new mongoose.Schema({
    dateAppointment: { type: Date, required: true },
    complaint: { type: String, required: true }, //Queixa para a consulta
}, { _id: false });

// --- Subdocumento de Medicamento ---
const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    description: { type: String, required: true },
    period: {
        hour: { type: Number, required: false }, 
        timeLapse: { type: String, required: false } // Semanalmente, etc.
    },
    priceMedicine: [priceSchema] // Usando o schema de Preço
}, { _id: false });

// --- Subdocumento de Doença ---
const diseaseSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    description: { type: String, required: true }, 
}, { _id: false });

// --- SCHEMA PRINCIPAL (PETS) ---
const petsSchema = new mongoose.Schema({
    idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    image: { type: String, required: true},
    namePet: { type: String, required: true}, // Nome é geralmente obrigatório
    typePet: { type: String, required: true },
    age: { type: Number, min: 0 },
    weight: { type: Number, min: 0 },
    bath: bathSchema,
    doctor: doctorSchema,
    doctorAppointment: [doctorAppointmentSchema],
    dateVaccination: { type: Date, required: false },
    medicine: [medicineSchema], // Adicionei o medicine ao schema principal
    disease: [diseaseSchema],
}, {
    timestamps: true
});


export default mongoose.model('Pet', petsSchema);