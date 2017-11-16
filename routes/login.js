//Configurar de la base de datos
var mysql = require('mysql');
var CryptoJS = require("crypto-js");

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
  console.log('Conexion establecida en login');
});

/*
 * POST /login
 */

exports.post = function (request, response) {
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
