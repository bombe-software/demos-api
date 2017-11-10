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
 * GET /estados
 */
exports.get = function (request, response) {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  console.log(request.body);
  con.query('select * from Lugares',
    [
        null
    ],
    function Query(error, rows) {
      response.end(JSON.stringify(rows));
    }
  );
};

/*
 * POST /politicos
 */
exports.post = function (request, response) {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  console.log(request.body);
  con.query('select * from Politico where id_tipo_politico = ? &&  id_lugar = ?',
    [
      request.body.id_tipo_politico,
      request.body.id_lugar
    ],
    function Query(error, rows) {
      response.end(JSON.stringify(rows));
    }
  );
};