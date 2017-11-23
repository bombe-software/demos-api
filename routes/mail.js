//Configurar de la base de datos
var axios = require('axios');
var FormData = require('form-data');

exports.post = function (request, response) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    var data = {
        email: request.body.correo_electronico
    }
    var headNav= axios.post(`http://bombesoftware.com/mini-api/mail.php`, data).then(res => {
            console.log(JSON.stringify(res.data));
        }
    );
};
  
