//Configurar de la base de datos
var mysql = require('mysql');
var config = require('./var_config');
var con = mysql.createConnection(config.data);

con.connect(function (err) {
  if (err) {
    console.log("Error conexion base");
    return;
  }
  console.log('Conexion establecida en partidos');
});

/*
 * GET /partidos
 */
exports.get = function (request, response) {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  console.log(request.body);
  con.query('select * from Cat_partido',
    [
        null
    ],
    function Query(error, rows) {
      response.end(JSON.stringify(rows));
    }
  );
};
