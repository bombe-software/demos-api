exports.get = function (request, response) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({titulo: "Informacion traida desde demos-api"}));
    response.end();
};
