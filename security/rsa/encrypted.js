var SHA256 = require("crypto-js/sha256");
var bigInt = require("big-integer");
/*
 * GET /update_user
 */
function primos(numero) {
    let arPrim = [];
    for (j = 3; j <= numero; j += 2) {
        let primo = true;
        for (k = 2; k < arPrim.length; k++) {
            if (j % arPrim[k] == 0) {
                primo = false;
                break;
            }
        }
        if (primo == true) {
            arPrim[arPrim.length] = j;
        }
    }
    return arPrim;
}


exports.get = function (request, response) {
    let rsa = require('./rsa');
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    
    // {"D":41,"E":5,"N":309}

    let firma = SHA256("Como estas?"+1+"Yo jaiba y tu?"+1).toString();
    response.write("Original: " + firma + "<br />");

    let cifrado = rsa.cifrar(firma, 41, 309);
    response.write("Cifrado: " + cifrado + "<br />");

    let descifrado = rsa.descifrar(cifrado, 5, 309);
    response.write("Descifrado: " + descifrado + "<br />");

    response.end();
};

