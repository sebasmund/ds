const express = require('express');
const router = express.Router();

const mysqlConnection = require('../connection/connection');

router.get('/', (req,res)=>{
    mysqlConnection.query('select * from dentistas', (err,rows,fields) => {
      if(!err){
        res.json(rows);
      }else{
        console.log(err);
      }
    })
  });
  
  router.post('/',(req, res)=>{
    try {
      const { nombre, apellido, telefono } = req.body;

      if (nombre === undefined || apellido === undefined || telefono === undefined) {
          res.status(400).json({ message: "Solicitud invalida. Rellene todos los campos." });
      }

      const dentista = { nombre, apellido, telefono };
      mysqlConnection.query("INSERT INTO dentistas SET ?", dentista);
      res.json({ message: "Dentista añadido de manera exitosa" });
  } catch (error) {
      res.status(500);
      res.send(error.message);
  }
  })


  router.delete('/:id',(req, res)=>{
    try {
      const { id } = req.params;
      mysqlConnection.query("DELETE FROM dentistas WHERE id_dentista = ?", id);
      res.json(result);
  } catch (error) {
      res.status(500);
      res.send(error.message);
  }
  })
  module.exports = router;