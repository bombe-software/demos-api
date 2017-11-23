//Configurar de la base de datos
var mysql = require('mysql');
var config = require('./var_config');
var con = mysql.createConnection(config.data);

con.connect(function (err) {
  if (err) {
    console.log("Error conexion base");
    return;
  }
  console.log('Conexion establecida signup');
});


/*
 * POST /signup
 */
exports.post = function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  console.log(request.body);
  con.query('insert into Usuario values(?,?,?,?,?,?,?,?,?,?)',
    [
      null, // id_usuario
      request.body.NombreUsuario,
      request.body.CorreoElectronico,
      request.body.IdTipoUsuario,
      request.body.Contrasena,
      request.body.CURP,
      request.body.Avatar,
      request.body.Puntos,
      null, // localidad
	    null  // fecha_registro
    ],
    function (error, rows) {
      response.end(JSON.stringify(rows));
    }
  );
};


