//Configurar de la base de datos
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "n0m3l0",
  database: "Demos"
});
con.connect(function (err) {
  if (err) {
    console.log("Error conexion base");
    return;
  }
  console.log('Conexion establecida en politico_busqueda');
});

/*
 * GET /tipo_propuesta
 */
exports.get = function (request, response) {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  console.log(request.body);
  con.query('select * from Cat_categoria_propuesta',
    [
        null
    ],
    function Query(error, rows) {
      response.end(JSON.stringify(rows));
    }
  );
};
