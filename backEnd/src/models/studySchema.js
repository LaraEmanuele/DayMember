import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    nameSubject: {type: String, required: true},
    objective: {type: String, required: true},
    goalTime: {type: Number, required} //Tempo em horas 
});

const exerciseSchema = new mongoose.Schema({
    totalExercise: {type: Number, required: true},
    correctExercise: {type: Number, required: true},
    mistakesExercise: {type: Number, required: true},
});

const sessionStudySchema = new mongoose.Schema({
    typeSession: {type: String, required: true},
    duration: {type: Number, required: true},
    subject: subjectSchema,
    exercise: exerciseSchema
});


const studySchema = new mongoose.Schema({
    idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    sessionStudy: sessionStudySchema

});

export default mongoose.model ('Study', studySchema);