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
  console.log('Conexion establecida :)');
});
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
  console.log('Conexion establecida en usuario');
});


/*
 * GET /usuario
 */
exports.get = function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' });

  con.query('select * from Usuario where IdUsuario = ?',
    [
      request.params.IdUsuario
    ],
    function (error, rows) {
      response.write(JSON.stringify(rows));
    }
  );
};

/*
 * POST /usuario
 */
exports.post = function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  console.log(request.body);
  con.query('insert into Usuario values(?,?,?,?,?,?,?,?)',
    [
      null,
      request.body.NombreUsuario,
      request.body.CorreoElectronico,
      request.body.IdTipoUsuario,
      request.body.Contrasena,
      request.body.CURP,
      request.body.Avatar,
      request.body.Puntos
    ],
    function (error, rows) {
      response.end(JSON.stringify(rows));
    }
  );
};

/*
 * PUT /usuario
 */
exports.put = function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  con.query('UPDATE Usuario SET NombreUsuario=?, CorreoElectronico=?, Contraseña =?, CURP=?, Avatar=?, Puntos = ? WHERE IdUsuario = ?',
    [
      request.body.NombreUsuario,
      request.body.CorreoElectronico,
      request.body.Contrasena,
      request.body.CURP,
      request.body.Avatar,
      request.body.Puntos,
      request.body.IdUsuario
    ],
    function (error, rows) {
      response.end(JSON.stringify(rows));
    }
  );
};

/*
 * Delete /usuario
 */
exports.delete = function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  con.query('delete from Usuario where IdUsuario=?',
    [
      request.params.IdUsuario
    ],
    function (error, rows) {
      response.end(JSON.stringify(rows));
    }
  );
};