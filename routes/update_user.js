//Configurar de la base de datos
var mysql = require('mysql');
var config = require('./var_config');
var con = mysql.createConnection(config.data);

con.connect(function (err) {
  if (err) {
    console.log("Error conexion base");
    return;
  }
  console.log('Conexion establecida politico_like');
});

/*
 * POST /update_user
 */
exports.post = function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  console.log(request.body);
  con.query('UPDATE usuario SET nombre_usuario=?, contrasena=?, avatar =? WHERE id_usuario=?',
    [
      request.body.NombreUsuario,
      request.body.Contrasena,
      request.body.Avatar,
      request.body.id_usuario
    ],
    function (error, rows) {
      response.end(JSON.stringify(rows));
    }
  );
};