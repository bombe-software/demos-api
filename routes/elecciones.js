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
  console.log('Conexion establecida en elecciones');
})


/*
 * POST /insert_elecciones
 */

exports.insert = function (request, response) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    console.log(request.body);
    con.query("call insert_or_update_eleccion(?,?)",
      [
        request.body.id_usuario,
        request.body.id_politico
      ],
      function Query(error, rows) {
        response.end(JSON.stringify(rows));
      }
    );
};

/*
 * POST /get_elecciones
 */

exports.get = function (request, response) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    console.log(request.body);
    con.query("call count_eleccion(?)",
      [
        request.body.id_lugar
      ],
      function Query(error, rows) {
        response.end(JSON.stringify(rows));
      }
    );
};


