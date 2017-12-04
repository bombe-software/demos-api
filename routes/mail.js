//Configurar de la base de datos
var axios = require('axios');
var FormData = require('form-data');
var SHA256 = require("crypto-js/sha256");
var mysql = require('mysql');
var config = require('./var_config');
var con = mysql.createConnection(config.data);

con.connect(function (err) {
  if (err) {
    console.log("Error conexion base");
    return;
  }
  console.log('Conexion establecida en mensajes');
})


exports.post = function (request, response) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    //request.body.id_usuario
    var data = {
        email: request.body.correo_electronico,
        mensaje: "Saludos, tu codigo de acceso es: " + SHA256("Como estas?"+request.body.id_usuario+"Yo jaiba y tu?"+request.body.id_usuario)
    }
    var headNav= axios.post(`http://bombesoftware.com/mini-api/mail.php`, data).then(res => {
            console.log(JSON.stringify(res.data));
        }
    );
};

exports.confirmar_usuario = function (request, response) {
    var id_usuario = 0;
    con.query('select id_usuario from Usuario_no_confirmado where email =?',
    [
        request.body.email
    ],
    function (error, rows) {
      id_usuario = rows[0].id_usuario;
      var firma = SHA256("Como estas?"+id_usuario+"Yo jaiba y tu?"+id_usuario)
      console.log(firma);
      if( request.body.firma == firma){
          con.query('call confirmar_usuario(?)',
          [
              id_usuario
          ],
          function (error, rows) {
            console.log(rows);
          });
          response.end(JSON.stringify({mensaje: "Todo bien"}));
      }else{
          response.end(JSON.stringify({mensaje: "No coincidio"}));
      }
    });
};
  
