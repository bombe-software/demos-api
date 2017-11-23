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
 * PUT /propuesta_like
 */
exports.put = function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  console.log(request.body);
  con.query('call insert_or_delete_like(?,?)',
    [
      request.body.id_propuesta,
      request.body.id_usuario
    ],
    function (error, rows) {
      response.end(JSON.stringify(rows));
    }
  );
};

/*
 * POST /propuesta_like
 */
exports.post = function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  console.log(request.body);
  con.query('select * from Rel_Like_propuesta_usuario where id_usuario=?',
    [
      request.body.id_usuario
    ],
    function (error, rows) {
      console.log(JSON.stringify(rows));
      response.end(JSON.stringify(rows));
    }
  );
};

/*
 * GET /propuesta_like
 */
exports.get = function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  con.query("select id_propuesta, count(*) as 'count' from Rel_Like_propuesta_usuario  group by id_propuesta",
    [
      
    ],
    function (error, rows) {
      response.end(JSON.stringify(rows));
    }
  );
};

