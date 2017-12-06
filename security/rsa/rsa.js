var bigInt = require("big-integer");
exports.generatorKeys = function (p, q) {
	let n = p *q;
    let phi = (p-1)*(q-1);
        
    let j = 0;
    let e = 0;
    for (let i = 1; j==0; i++) {
        j = phi%i;
        e = i;
    }
        
    let d = 2.5;
    for (let i = 1; d%1!=0; i++) {
        d = ((i*phi)+1)/e;
    }
    return { D:d, E:e, N:n }
};

exports.cadenaToBytes = function(cadena){
    var ascii = [];
    for (var i = 0; i < cadena.length; i++) {
        ascii[i] = cadena.charCodeAt(i);
    };
    return ascii;
};

exports.bytesToCadena = function(bytes){
    let cadena = "";
    for (var i = 0; i < bytes.length; i++) {
        cadena += String.fromCharCode(bytes[i]);
    };
    return cadena;
};

exports.cifrarBytes = function(cadena, d, n){
    var cifrado = [];
    for (var i = 0; i < cadena.length; i++) {
        cifrado[i] = bigInt(bigInt(parseInt(cadena[i])).pow(d)).mod(n);
    };
    return cifrado;
};

exports.descifrarBytes = function(cadena, e, n){
    var descifrado = [];
    for (var i = 0; i < cadena.length; i++) {
        descifrado[i] = bigInt(bigInt(parseInt(cadena[i])).pow(e)).mod(n);
    };
    return descifrado;
};

exports.cifrar = function(cadena, d, n){
    let rsa = require('./rsa'); 
    let bytes = rsa.cadenaToBytes(cadena);
    let bytesCifrado = rsa.cifrarBytes(bytes, d, n);
    return rsa.bytesToCadena(bytesCifrado);
};

exports.descifrar = function(cadena, e, n){
    let rsa = require('./rsa'); 
    let bytes = rsa.cadenaToBytes(cadena);
    let bytesCifrado = rsa.descifrarBytes(bytes, e, n);
    return rsa.bytesToCadena(bytesCifrado);
};