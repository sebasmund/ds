const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection/connection');
const moment = require('moment');
const jwt = require('jsonwebtoken');


router.post('/agenda', (req, res) => {
  const { fecha, doctorSelected } = req.body;

  // Consulta para obtener los datos de la agenda
  const query = `SELECT * FROM agenda WHERE fecha = ? AND doctor = ?`;

  mysqlConnection.query(query, [fecha, doctorSelected], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
      res.status(500).json('Error en el servidor');
    }
  });
});

router.post('/agenda/cita', (req, res) => {
  const { fecha, hora, paciente, doctor } = req.body;

  // Consulta para agregar una cita en la agenda
  const query = `INSERT INTO agenda (fecha, hora, paciente, doctor) VALUES (?, ?, ?, ?)`;

  mysqlConnection.query(query, [fecha, hora, paciente, doctor], (err, result) => {
    if (!err) {
      res.json({ status: 1, message: 'Cita agregada correctamente' });
    } else {
      console.log(err);
      res.status(500).json('Error en el servidor');
    }
  });
});

module.exports = router;