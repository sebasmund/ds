const express = require('express');
const router = express.Router();

const mysqlConnection = require('../connection/connection');

const jwt = require('jsonwebtoken');


router.get('/', (req,res)=>{
  mysqlConnection.query('select * from usuarios', (err,rows,fields) => {
    if(!err){
      res.json(rows);
    }else{
      console.log(err);
    }
  })
});

/*router.post('/login', (req, res)=>{
  try {
    const { usuario, clave } = req.body;

    if (usuario === undefined || clave === undefined ) {
        res.status(400).json({ message: "Solicitud invalida. Rellene todos los campos." });
    }

    const credenciales = { usuario, clave };
    mysqlConnection.query('select usuario from usuarios where usuario=? and clave=?', credenciales,
    (err,rows,fields) => {
      if(!err){
        if(rows.length >0){
          let data = JSON.stringify(rows[0]);
          const token = jwt.sign(data, 'stil');
          res.json({token});
        }else{
          res.json('Usuario o clave incorrectos');
        }
        
      }else{
        console.log(err);
      }
    }
    )
    res.json({ message: "Credenciales válidas" });
} catch (error) {
    res.status(500);
    res.send(error.message);
}
})*/

router.post('/login', (req, res) => {
  const { co_user, pass_user } = req.body;
  console.log('validacion')
  console.log(co_user, pass_user)
  console.log(req.body)
  mysqlConnection.query(
    'SELECT usuario FROM usuarios WHERE usuario=? AND clave=?',
    [co_user, pass_user],
    (err, rows, fields) => {
      if (!err) {
        if (rows.length > 0) {
          const data = JSON.stringify(rows[0]);
          const token = jwt.sign(data, 'stil');
          res.json({ status: 1, token});
          //res.json({ token });
        } else {
          res.status(401).json('Usuario o clave incorrectos');
        }
      } else {
        console.log(err);
        res.status(500).json('Error en el servidor');
      }
    }
  );
});

/*router.post('/login', (req,res) => {
 const { co_user, pass_user } = req.body;
  const usuario = req.body.co_user;
  const clave = req.body.pass_user;  
  console.log('validacion')
  console.log(co_user)
  console.log(req.body)
  //const login = { co_user, pass_user};
  mysqlConnection.query('select usuario from usuarios where usuario=? and clave=?', {usuario, clave},
  //[co_user,pass_user],
  (err,rows,fields) => {
    if(!err){
      if(rows.length >0){
        let data = JSON.stringify(rows[0]);
        const token = jwt.sign(data, 'stil');
        res.json({token});
      }else{
        res.json('Usuario o clave incorrectos');
      }
      
    }else{
      console.log(err);
    }
  }
  )
//})*/

router.post('/test',verifyToken, (req,res) => {
  res.json('Informacion secreta');
})

function verifyToken(req,res, next){
  if(!req.headers.authorization) return res.status(401).json('No autorizado');

  const token = req.headers.authorization.substr(7);
  if(token!==''){
    const content = jwt.verify(token,'stil');
    req.data = content;
    next();
  }else{
    res.status(401).json('Token vacio');
  }

}


module.exports = router;