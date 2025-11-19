import mongoose from 'mongoose';

// --- Subdocument Schema for House Space Details ---
const spaceHouseSchema = new mongoose.Schema({
    numberRoom: {type: Number, required: true},
    numberBathroom: {type: Number, required: true},
    numberBedRoom: {type: Number, required: true},
    numberDinnerRoom: {type: Number, required: true},
    numberLivingroom: {type: Number, required: true},
    numberKitchen: {type: Number, required: true},
});

// --- Subdocument Schema for a Single Floor ---
// This schema uses spaceHouseSchema to describe the rooms on that floor.
const floorSchema = new mongoose.Schema({
    floorNumber: {type: Number, required: true},
    space: spaceHouseSchema // This embeds the space details for the specific floor
});

// --- Main House Schema ---
const houseSchema = new mongoose.Schema({
    idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    nameHouse: {type: String, required: true},
    // The previous 'floor' boolean and 'numberFloor' were removed for simplicity.
    // 'floors' is an array of subdocuments, one for each floor/level.
    floors: [floorSchema] 

},{
    timestamps: true
});

export default mongoose.model('House', houseSchema);