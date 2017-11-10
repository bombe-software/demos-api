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
  console.log('Conexion establecida en politico');
})

/*
 * POST /politico
 */
exports.get = function (request, response) {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  console.log(request.body);
  con.query('call datos_politico(?)',
    [
      request.body.id_politico
    ],
    function Query(error, rows) {
      response.end(JSON.stringify(rows));
    }
  );
};

/*
 * POST /propuestas
 */
exports.post = function (request, response) {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  console.log(request.body);
  con.query('call propuestas_politico(?)',
    [
      request.body.id_politico
    ],
    function Query(error, rows) {
      response.end(JSON.stringify(rows));
    }
  );
};

/*
 * POST /historial
 */
exports.view = function (request, response) {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  console.log(request.body);
  con.query('call historial_politico(?)',
    [
      request.body.id_politico
    ],
    function Query(error, rows) {
      response.end(JSON.stringify(rows));
    }
  );
};

/*
 * POST /insert_politico
 */

exports.insert = function (request, response) {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  console.log(request.body);
  con.query("insert into Propuesta_politico values(null, ?, ?, DATE('2017-06-01'), ?, ?, ?, ?)",
    [
      request.body.nombre,
      request.body.id_partido,
      request.body.id_tipo_politico,
      request.body.motivacion,
      request.body.id_lugar,
      request.body.id_usuario
    ],
    function Query(error, rows) {
      response.end(JSON.stringify(rows));
    }
  );
};

/*
 * POST /insert_propuesta
 */

exports.insert_propuesta = function (request, response) {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  console.log(request.body);
  con.query("insert into Propuesta_propuesta values(null, ?, null, ?,?,?, ?)",
    [
      request.body.id_politico,
      request.body.id_categoria_propuesta,
      request.body.nombre,
      request.body.descripcion,
      request.body.id_usuario
    ],
    function Query(error, rows) {
      response.end(JSON.stringify(rows));
    }
  );
};


/*
 * POST /insert_historial
 */

exports.insert_historial = function (request, response) {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  console.log(request.body);
  con.query("insert into Propuesta_historial values(null, ?, ?, ?, ?, ?)",
    [
      request.body.id_politico,
      new Date(request.body.fecha),
      request.body.nombre,
      request.body.descripcion,
      request.body.id_usuario
    ],
    function Query(error, rows) {
      response.end(JSON.stringify(rows));
    }
  );
};