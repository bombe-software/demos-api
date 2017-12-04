//Configurar de la base de datos
var mysql = require('mysql');
var config = require('./var_config');
var con = mysql.createConnection(config.data);
var CryptoJS = require("crypto-js");

con.connect(function (err) {
  if (err) {
    console.log("Error conexion base");
    return;
  }
  console.log('Conexion establecida :)');
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


/*
 * POST /signup
 */
exports.signup = function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  console.log(request.body);
  con.query('insert into Usuario_no_confirmado values(?,?,?,?,?,?,?,?,?,?)',
    [
      null, // id_usuario
      request.body.NombreUsuario,
      request.body.CorreoElectronico,
      request.body.IdTipoUsuario,
      request.body.Contrasena,
      request.body.CURP,
      request.body.Avatar,
      request.body.Puntos,
      null, // localidad
	    null  // fecha_registro
    ],
    function (error, rows) {
      console.log(JSON.stringify(rows));
    }
  );
  con.query('select id_usuario from Usuario_no_confirmado where id_usuario in(select MAX(id_usuario) as maximo from Usuario_no_confirmado)',
  [
  ],
  function (error, rows) {
    response.end(JSON.stringify({id_usuario: rows[0].id_usuario}));
  }
);
};

/*
 * POST /login
 */

exports.login = function (request, response) {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  if(request.body.correo_electronico !="404"){
    let ip = request.headers['cf-connecting-ip'] || request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    con.query('select  * from Usuario  where email = ?',
        [
          request.body.correo_electronico
        ],
        function Query(error, rows) {
          if(JSON.stringify(rows) != '[]'){
            let usuario = JSON.parse(JSON.stringify(rows[0]));
            let bytes  = CryptoJS.AES.decrypt(request.body.ticket, 'jaiba');
            let ticket = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            if(ticket.direccion_cliente == ip && ticket.route == request.originalUrl){
              console.log(usuario);
              response.end(JSON.stringify(usuario));
            }else{
              response.end("404");
            }
          }	
        }
    );
  }else{
    response.end("404");
  }
	
};


