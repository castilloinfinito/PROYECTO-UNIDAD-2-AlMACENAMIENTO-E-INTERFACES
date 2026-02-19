const mongoose = require('mongoose');

const PacienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  ci: { type: String, required: true, unique: true },
  telefono: { type: String }
}, { timestamps: true });

const MedicoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  especialidad: { type: String, required: true },
  mpps: { type: String, required: true }
}, { timestamps: true });

const ExamenSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  numeroOrden: { type: String, required: true },
  medicoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medico' }
}, { timestamps: true });

const ResultadoSchema = new mongoose.Schema({
  numeroOrden: { type: String, required: true },
  pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true },
  medicoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medico' },
  valor: { type: String, required: true },
  fecha: { type: Date, default: Date.now }
}, { timestamps: true });

const UsuarioSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  rol: { type: String, enum: ['Admin', 'Bioanalista', 'Recepcion'], default: 'Bioanalista' },
  cargo: { type: String, required: true }
}, { timestamps: true });

module.exports = {
  Paciente: mongoose.model('Paciente', PacienteSchema),
  Medico: mongoose.model('Medico', MedicoSchema),
  Examen: mongoose.model('Examen', ExamenSchema),
  Resultado: mongoose.model('Resultado', ResultadoSchema),
  Usuario: mongoose.model('Usuario', UsuarioSchema)
};