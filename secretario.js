class Secretario {

    constructor(fs) {
        this.fs = require('fs');;
    }

    escribir(ruta, contenido) {
        this.fs.writeFile(ruta, contenido,  err => {
            if (err) {
                return console.log(err);
            }
        });
    }

    leer(ruta, handle) {
        this.fs.readFile(ruta, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            handle(data);
        });
    }
}
exports.new = new Secretario();