//Configurar de la base de datos
var mysql = require('mysql');
var config = require('./var_config');
var con = mysql.createConnection(config.data);


con.connect(function (err) {
  if (err) {
    console.log("Error conexion base");
    return;
  }
  console.log('Conexion establecida en moderador');
})

/*
 * GET /pendientes_propuesta
 */
exports.pendientes_propuesta = function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    con.query("select * from pendientes_propuesta",
      [],
      function (error, rows) {
        response.end(JSON.stringify(rows));
      }
    );
  };

  /*
 * GET /pendientes_historial
 */
exports.pendientes_historial = function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    con.query("select * from pendientes_historial",
      [],
      function (error, rows) {
        response.end(JSON.stringify(rows));
      }
    );
  };

/*
 * GET /pendientes_politico
 */
exports.pendientes_politico = function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    con.query("select * from pendientes_politico",
      [],
      function (error, rows) {
        response.end(JSON.stringify(rows));
      }
    );
};

/*
 * POST /insert_politico
 */
exports.insert_politico = function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  console.log(request.body);
  con.query('call insert_politico(?)',
    [
      request.body.id_politico
    ],
    function (error, rows) {
      response.end(JSON.stringify(rows));
    }
  );
};

/*
 * POST /insert_historial
 */
exports.insert_historial = function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  console.log(request.body);
  con.query('call insert_historial(?)',
    [
      request.body.id_historial
    ],
    function (error, rows) {
      response.end(JSON.stringify(rows));
    }
  );
};

/*
 * POST /insert_propuesta
 */
exports.insert_propuesta = function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  console.log(request.body);
  con.query('call insert_propuesta(?)',
    [
      request.body.id_propuesta
    ],
    function (error, rows) {
      response.end(JSON.stringify(rows));
    }
  );
};

/*
 * POST /delete_politico
 */
exports.delete_politico = function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  console.log(request.body);
  con.query('delete from Propuesta_politico  where Propuesta_politico.id_politico = ?',
    [
      request.body.id_politico
    ],
    function (error, rows) {
      response.end(JSON.stringify(rows));
    }
  );
};

/*
 * POST /delete_historial
 */
exports.delete_historial = function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  console.log(request.body);
  con.query('delete from Propuesta_historial  where Propuesta_historial.id_historial = ?',
    [
      request.body.id_historial
    ],
    function (error, rows) {
      console.log("delete from Propuesta_historial  where Propuesta_historial.id_historial =" +  request.body.id_historial);
      response.end(JSON.stringify(rows));
    }
  );
};

/*
 * POST /delete_propuesta
 */
exports.delete_propuesta = function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  console.log(request.body);
  con.query('delete from Propuesta_propuesta  where Propuesta_propuesta.id_propuesta = ?',
    [
      request.body.id_propuesta
    ],
    function (error, rows) {
      response.end(JSON.stringify(rows));
    }
  );
};

