const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2003',
  database: 'dentalstyle',
  port: '3306'
});

mysqlConnection.connect( err => {
  if(err){
    console.log('Error en db: ', err);
    return;
  }else{
    console.log('Aplicación corriendo en el puerto 3000');
  }
});

module.exports = mysqlConnection;