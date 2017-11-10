/**
 * Configuracion basica de express y Socket.io
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser =  require("body-parser");

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
 *	Configuracion de las rutas
 */
//Usuario
var usuario = require('./routes/usuario'); 
app.get('/usuario/:IdUsuario', usuario.get);
app.post('/usuario', usuario.post);
app.put('/usuario', usuario.put);
app.delete('/usuario/:IdUsuario', usuario.delete);

//SignUp
var signup = require('./routes/signup'); 
app.post('/signup', signup.post);

//Login
var login = require('./routes/login'); 
app.post('/login', login.post);

//Politico_busqueda
var politico_busqueda = require('./routes/politico_busqueda');
app.get('/estados', politico_busqueda.get);
app.post('/politicos', politico_busqueda.post);

//Politico
var politico = require('./routes/politico'); 
app.post('/politico', politico.get);
app.post('/propuestas', politico.post);
app.post('/historial', politico.view);
app.post('/insert_politico', politico.insert);
app.post('/insert_propuesta', politico.insert_propuesta);
app.post('/insert_historial', politico.insert_historial);


//Propuestas
var propuestas = require('./routes/propuestas'); 
app.post('/propuesta_like', propuestas.post);
app.put('/propuesta_like', propuestas.put);
app.get('/propuesta_like', propuestas.get);

//update_user
var update_user = require('./routes/update_user'); 
app.post('/update_user', update_user.post);

//partidos
var partidos = require('./routes/partidos'); 
app.get('/partidos', partidos.get);

//tipo_propuesta
var tipo_propuesta = require('./routes/tipo_propuesta'); 
app.get('/tipo_propuesta', tipo_propuesta.get);

//moderador
var moderador = require('./routes/moderador'); 
app.get('/pendientes_propuesta', moderador.pendientes_propuesta);
app.get('/pendientes_historial', moderador.pendientes_historial);
app.get('/pendientes_politico', moderador.pendientes_politico);
app.post('/call_historial', moderador.insert_historial);
app.post('/call_propuesta', moderador.insert_propuesta);
app.post('/call_politico', moderador.insert_politico);
app.post('/delete_historial', moderador.delete_historial);
app.post('/delete_propuesta', moderador.delete_propuesta);
app.post('/delete_politico', moderador.delete_politico);

//elecciones
var elecciones = require('./routes/elecciones'); 
app.post('/get_elecciones', elecciones.get);
app.post('/insert_elecciones', elecciones.insert);

//mensajes
var mensajes = require('./routes/mensajes'); 
app.post('/fetch_mensajes', mensajes.get);
app.post('/insert_mensajes', mensajes.insert);


/*
 *	Eventos de  Socket.io 
 */
var usuariosConectados = [];
io.on('connection', function (socket) {
  socket.on('asociar_id', function (data) {
    usuariosConectados[data.id_usuario] = socket.id;
    console.log(usuariosConectados);
  });
  socket.on('msg', function (data) {
    io.to(usuariosConectados[data.id_destinatario])
    .emit('actualizar_msg', { id_destinatario:  data.id_destinatario });
    console.log({ id_destinatario:  data.id_destinatario });
  });
});

/*
 *	Poner a la escucha el servidor 
 */
http.listen(3000, function(){
  console.log('listening on *:3000');
});






