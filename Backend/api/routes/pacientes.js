const express = require('express');
const router = express.Router();

const mysqlConnection = require('../connection/connection');

router.get('/', (req,res)=>{
    mysqlConnection.query('select * from pacientes', (err,rows,fields) => {
      if(!err){
        res.json(rows);
      }else{
        console.log(err);
      }
    })
  });


router.post('/', (req, res)=>{
  try {
    const { nombre, apellido, telefono, correo_electronico, cedula } = req.body;

    if (nombre === undefined || apellido === undefined || telefono === undefined || correo_electronico === undefined || cedula === undefined) {
        res.status(400).json({ message: "Solicitud invalida. Rellene todos los campos." });
    }

    const paciente = { nombre, apellido, telefono, correo_electronico, cedula };
    mysqlConnection.query("INSERT INTO pacientes SET ?", paciente);
    res.json({ message: "Paciente añadido de manera exitosa" });
} catch (error) {
    res.status(500);
    res.send(error.message);
}
})

router.delete('/:id',(req, res)=>{
  try {
    const { id_paciente } = req.params;
     mysqlConnection.query("DELETE FROM pacientes WHERE id_paciente = ?", id_paciente);
    res.json(result);
} catch (error) {
    res.status(500);
    res.send(error.message);
}
})
  module.exports = router;