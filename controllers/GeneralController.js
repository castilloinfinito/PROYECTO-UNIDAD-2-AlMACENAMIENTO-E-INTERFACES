
  const { Paciente, Medico, Examen, Usuario, Resultado } = require('../models/LaboratorioModels');

class GenericController {
  constructor(model) {
    this.model = model;
  }

  listar = async (req, res) => {
    try {
      // Intenta popular campos comunes si existen en el modelo
      const data = await this.model.find()
        .populate('medicoId')
        .populate('pacienteId')
        .sort({ createdAt: -1 });
      res.json(data);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  crear = async (req, res) => {
    try {
      const nuevo = await this.model.create(req.body);
      res.status(201).json(nuevo);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  actualizar = async (req, res) => {
    try {
      const editado = await this.model.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!editado) return res.status(404).json({ error: "No encontrado" });
      res.json(editado);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  eliminar = async (req, res) => {
    try {
      const borrado = await this.model.findByIdAndDelete(req.params.id);
      if (!borrado) return res.status(404).json({ error: "No encontrado" });
      res.json({ mensaje: "Eliminado correctamente" });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
}

module.exports = {
  PacienteCtrl: new GenericController(Paciente),
  MedicoCtrl: new GenericController(Medico),
  ExamenCtrl: new GenericController(Examen),
  UsuarioCtrl: new GenericController(Usuario),
  ResultadoCtrl: new GenericController(Resultado)
};