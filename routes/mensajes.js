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
 * POST /insert_mensajes
 */

exports.insert = function (request, response) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    console.log(request.body);
    con.query("insert Mensaje values(null, ?, ?, ?, null)",
      [
        request.body.id_destinatario, 
        request.body.id_remitente, 
        request.body.mensaje
      ],
      function Query(error, rows) {
        response.end(JSON.stringify(rows));
      }
    );
};

/*
 * POST /fetch_mensajes
 */

exports.get = function (request, response) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    console.log(request.body);
    con.query("select * from Mensaje where (id_destinatario = ? && id_remitente = ?) || (id_destinatario = ? && id_remitente = ?)",
      [
        request.body.id_local,
        request.body.id_externo,
        request.body.id_externo,
        request.body.id_local
      ],
      function Query(error, rows) {
        response.end(JSON.stringify(rows));
      }
    );
};

/**
 * POST /fetch_conversaciones
 */
exports.view = function (request, response) {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  console.log(request.body);
  con.query("call conversaciones(?)",
    [
      request.body.id_local
    ],
    function Query(error, rows) {
      response.end(JSON.stringify({rows}));
    }
  );
};
