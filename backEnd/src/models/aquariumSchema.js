import mongoose from "mongoose";

// Tipos de tratamento que podem ser aplicados (reutilizado do Plant Schema)
const TreatmentType = ['Pesticida', 'Fungicida', 'Orgânico', 'Químico', 'Antibiótico', 'Sal'];

// 1. SCHEMA DE MEDICAMENTOS/TRATAMENTOS (Subdocumento)
const MedicineSchema = new mongoose.Schema({
    nameMedication: { type: String, required: true },
    restrictionType: {
        type: String,
        required: true,
        enum: TreatmentType // Usando enum para restringir valores
    },
    frequency: { type: Number, required: true },
    dateStartTreatment: { type: Date, required: true, default: Date.now },
    dateEndTreatment: { type: Date, required: false },
    successUse: { type: Boolean, required: false, default: false },
}, { _id: false });

// 2. SCHEMA DE DOENÇAS/SAÚDE (Subdocumento, genérico para fauna ou flora)
const SickSchema = new mongoose.Schema({
    status: { type: Boolean, required: true, default: false }, // false se estiver saudável por padrão
    imagePrague: { type: String, required: false }, // URL da imagem da praga/doença
    namePrague: { type: String, required: false },
    medicineUsed: [MedicineSchema]

}, { _id: false });

// 3. SCHEMA DE FLORA AQUÁTICA (Aquarium Plants)
const AquaticPlantSchema = new mongoose.Schema({
    image: { type: String, required: false },
    name: { type: String, required: true },
    spicie: { type: String, required: false },
    
    // timeLux renomeado para lightHours para maior clareza
    lightHours: { type: Number, required: true }, 
    sick: SickSchema
}, { _id: false });

// 4. SCHEMA DE FAUNA (Peixes e Outros Animais)
const FaunaSchema = new mongoose.Schema({
    image: { type: String, required: false },
    name: { type: String, required: true },
    spicie: { type: String, required: false },
    
    // Usa o mesmo schema de doença (SickSchema)
    sick: SickSchema 
}, { _id: false });

// 5. SCHEMA PRINCIPAL DO AQUÁRIO
const aquariumsSchema = new mongoose.Schema({
    idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    volume: { type: Number, required: true },
    
    dimensions: {
        lengthAquarium: { type: Number, required: true },
        heightAquarium: { type: Number, required: true },
        widthAquarium: { type: Number, required: true },
    },
    
    plantedAquarium: { type: Boolean, required: true },
    
    // Agora é um ARRAY de plantas, pois aquários têm várias.
    plantsAquarium: [AquaticPlantSchema], 
    
    // Lista de peixes e outros animais
    pisces: [FaunaSchema] 
}, {
    timestamps: true // Adiciona createdAt e updatedAt
});

export default mongoose.model('Aquarium', aquariumsSchema);