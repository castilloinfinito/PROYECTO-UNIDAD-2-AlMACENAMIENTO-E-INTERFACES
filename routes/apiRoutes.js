//importacion de los modulos requeridos para el enrutamiento dinamico
const express = require('express');
const Ctrl = require('../controllers/GeneralController');
const router = express.Router();

// Ctrl:Importas un objeto que contiene toda la lógica de control (los controladores)
const mapeo = {
  pacientes: Ctrl.PacienteCtrl,
  medicos: Ctrl.MedicoCtrl,
  examenes: Ctrl.ExamenCtrl,
  usuarios: Ctrl.UsuarioCtrl,
  resultados: Ctrl.ResultadoCtrl
};
// El Bucle Dinámico (forEach).
Object.keys(mapeo).forEach(ent => {
  router.get(`/${ent}`, mapeo[ent].listar);
  router.post(`/${ent}`, mapeo[ent].crear);
  router.put(`/${ent}/:id`, mapeo[ent].actualizar);
  router.delete(`/${ent}/:id`, mapeo[ent].eliminar);
});
// exportar el paquete de enrutador
module.exports = router;