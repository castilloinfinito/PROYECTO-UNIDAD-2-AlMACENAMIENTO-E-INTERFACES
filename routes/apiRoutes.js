const express = require('express');
const Ctrl = require('../controllers/GenericController');
const router = express.Router();

const mapeo = {
  pacientes: Ctrl.PacienteCtrl,
  medicos: Ctrl.MedicoCtrl,
  examenes: Ctrl.ExamenCtrl,
  usuarios: Ctrl.UsuarioCtrl,
  resultados: Ctrl.ResultadoCtrl
};

Object.keys(mapeo).forEach(ent => {
  router.get(`/${ent}`, mapeo[ent].listar);
  router.post(`/${ent}`, mapeo[ent].crear);
  router.put(`/${ent}/:id`, mapeo[ent].actualizar);
  router.delete(`/${ent}/:id`, mapeo[ent].eliminar);
});

module.exports = router;