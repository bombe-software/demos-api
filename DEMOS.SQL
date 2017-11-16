drop database if exists Demos;
create database Demos;
use Demos;

/*Usuario-------------------------------------------------------------------------------*/

/*1*/
create table Cat_tipo_usuario(
	id_tipo_usuario int(2) primary key auto_increment,
    tipo_usuario varchar(30)
);
insert into Cat_tipo_usuario values(1, "Registrado");
insert into Cat_tipo_usuario values(2, "Moderador");
insert into Cat_tipo_usuario values(3, "Administrador");

/*2*/
create table Usuario(
	id_usuario int(100) primary key auto_increment,
	nombre_usuario varchar(30),
    email varchar(60),
    id_tipo_usuario int(2),
    contrasena varchar(20),
    curp varchar(20),
    avatar varchar(20),
    puntos int(10),
    localidad varchar(255),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    foreign key (id_tipo_usuario) references Cat_tipo_usuario(id_tipo_usuario)
);
insert into Usuario values(null, 'Vicroni', 'drasa_00@hotmail.com', 3, '1204', 'GODSF', 'chivo', 0, 'En algun lugar', null);
insert into Usuario values(null, 'Jaiba',   'diletalvezalaautopista@gmail.com', 2, 'MedinaVilla123', 'MEVJJ', 'jaiba', 0, 'En algun lugar', null);
insert into Usuario values(null, 'Admin',   'admin@gmail.com', 2, '123', 'ADMIN', 'jaiba', 0, 'En algun lugar', null);
insert into Usuario values(null, 'hgwells07', 'carlitose07@gmail.com', 2, 'Hola123', 'GODSF', 'anguila', 0, 'En algun lugar', null);

CREATE OR REPLACE VIEW UsuarioSeguro AS
select 
id_usuario,	nombre_usuario, email, id_tipo_usuario, curp, avatar, puntos, localidad, fecha_registro
from Usuario;
/*select * from usuario;*/


/*3*/
create table Solicitud_moderador(
	id_solicitud_moderador int(100) primary key auto_increment,
    id_usuario int(100),
    estado boolean,
    foreign key (id_usuario) references Usuario(id_usuario)
);




/*Candidato-----------------------------------------------------------------------------*/


/*4*/
create table Cat_categoria_lugar(
	id_categoria_lugar int(2) primary key auto_increment,
    categoria varchar(30)
);
insert into Cat_categoria_lugar values(1, "Noroeste");
insert into Cat_categoria_lugar values(2, "Noreste");
insert into Cat_categoria_lugar values(3, "Occidente");
insert into Cat_categoria_lugar values(4, "Oriente");
insert into Cat_categoria_lugar values(5, "Centronorte");
insert into Cat_categoria_lugar values(6, "Centrosur");
insert into Cat_categoria_lugar values(7, "Suroeste");
insert into Cat_categoria_lugar values(8, "Sureste");
insert into Cat_categoria_lugar values(9, "Nacional");


/*5*/
create table Cat_lugar(
	id_lugar int(2) primary key auto_increment,
    id_categoria_lugar int(2),
    lugar varchar(30),
    foreign key (id_categoria_lugar) references Cat_categoria_lugar(id_categoria_lugar)
);
insert into Cat_lugar values(1, 1, "Baja California");
insert into Cat_lugar values(2, 1, "Baja California Sur");
insert into Cat_lugar values(3, 1, "Chihuahua");
insert into Cat_lugar values(4, 1, "Durango");
insert into Cat_lugar values(5, 1, "Sinaloa");
insert into Cat_lugar values(6, 1, "Sonora");

insert into Cat_lugar values(7, 2, "Coahuila");
insert into Cat_lugar values(8, 2, "Nuevo León");
insert into Cat_lugar values(9, 2, "Tamaulipas");
insert into Cat_lugar values(10, 3, "Colima");
insert into Cat_lugar values(11, 3, "Jalisco");
insert into Cat_lugar values(12, 3, "Michoacán");
insert into Cat_lugar values(13, 3, "Nayarit");

insert into Cat_lugar values(14, 4, "Hidalgo");
insert into Cat_lugar values(15, 4, "Puebla");
insert into Cat_lugar values(16, 4, "Tlaxcala");
insert into Cat_lugar values(17, 4, "Veracruz");

insert into Cat_lugar values(18, 5, "Aguascalientes");
insert into Cat_lugar values(19, 5, "Guanajuato");
insert into Cat_lugar values(20, 5, "Querétaro");
insert into Cat_lugar values(21, 5, "San Luis Potosí");
insert into Cat_lugar values(22, 5, "Zacatecas");

insert into Cat_lugar values(23, 6, "Ciudad de México");
insert into Cat_lugar values(24, 6, "México");
insert into Cat_lugar values(25, 6, "Morelos");

insert into Cat_lugar values(26, 7, "Chiapas");
insert into Cat_lugar values(27, 7, "Guerrero");
insert into Cat_lugar values(28, 7, "Oaxaca");

insert into Cat_lugar values(29, 8, "Campeche");
insert into Cat_lugar values(30, 8, "Quintana Roo");
insert into Cat_lugar values(31, 8, "Tabasco");
insert into Cat_lugar values(32, 8, "Yucatán");

insert into Cat_lugar values(33, 9, "Nacional");

CREATE OR REPLACE VIEW Lugares AS
select 
Cat_lugar.id_lugar as id,
Cat_lugar.lugar as nombre,
Cat_categoria_lugar.categoria as zona
from Cat_lugar
inner join Cat_categoria_lugar on Cat_categoria_lugar.id_categoria_lugar = Cat_lugar.id_categoria_lugar;
/*select * from Lugares;*/

/*6*/
create table Cat_tipo_politico(
	id_tipo_politico int(2) primary key auto_increment,
    tipo varchar(50)
);
insert into Cat_tipo_politico values(1, "Funcionario");
insert into Cat_tipo_politico values(2, "Candidato");


/*7*/
create table Cat_partido(
	id_partido int(2) primary key auto_increment,
    partido varchar(50)
);
insert into Cat_partido values(1, "PRI");
insert into Cat_partido values(2, "PAN");
insert into Cat_partido values(3, "PRD");
insert into Cat_partido values(4, "MORENA");


/*8*/
create table Politico(
	id_politico int(50) primary key auto_increment,
    nombre varchar(255),
    id_partido int(2),
    fecha_incio_politica varchar(255),
    id_tipo_politico int(2),
    motivacion varchar(255),
    id_lugar int(2),
    foreign key (id_partido) references Cat_partido(id_partido),
    foreign key (id_tipo_politico) references Cat_tipo_politico(id_tipo_politico),
    foreign key (id_lugar) references Cat_lugar(id_lugar)
);
insert into Politico values(null, "Delfina Gómez Álvarez", 1, DATE("2017-06-01"), 1, 'Hacer de mexico algo mejor', 12);
insert into Politico values(null, "Juan Manuel Zepeda Hernández", 2, DATE("2017-06-02"), 2, 'Hacer de mexico una potencia', 12);
insert into Politico values(null, "Josefina Vázquez Mota", 3, DATE("2017-06-03"), 2, 'Ganar dinero', 12);
insert into Politico values(null, "Teresa Castell de Oro Palacios", 4, DATE("2017-06-04"), 2, 'Defender el peso como un perro', 24);
insert into Politico values(null, "Enrique Peña Nieto", 4, DATE("2017-06-05"), 1, 'Movemos a mexico', 33);


/*select * from Politico where id_tipo_politico = 2 &&  id_lugar = 12;*/


DROP PROCEDURE IF EXISTS datos_politico; ELSE
DELIMITER //
CREATE PROCEDURE datos_politico(in idX int) BEGIN
	select 
    Politico.id_politico,
	Politico.nombre, 
	Cat_partido.partido,
	Politico.fecha_incio_politica,
	Cat_tipo_politico.tipo,
	Politico.motivacion,
	Cat_lugar.lugar 
	from Politico 
	inner join Cat_partido on Cat_partido.id_partido = Politico.id_partido
	inner join Cat_tipo_politico on Cat_tipo_politico.id_tipo_politico = Politico.id_tipo_politico
	inner join Cat_lugar on Cat_lugar.id_lugar = Politico.id_lugar
	where id_politico=idX;
END //
DELIMITER ;
/*call datos_politico(1);*/


/*9*/
create table Estudios(
	id_estudios int(50) primary key auto_increment,
    id_politico int(2),
    nombre varchar(255),
    lugar varchar(255),
    foreign key (id_politico) references Politico(id_politico)
);
insert into Estudios values(null, 1, "Lic. en ciencias politicas", "UNAM");
insert into Estudios values(null, 1, "Lic. en relaciones exteriores", "ITAM");
insert into Estudios values(null, 2, "Lic. en economia", "UVM");
insert into Estudios values(null, 2, "Lic. en administracion", "TESCO");
insert into Estudios values(null, 3, "Dr. en ciencias politicas", "MIT");
insert into Estudios values(null, 4, "Mtro. en ciencias politicas", "Unitec");


/*10*/
create table Cat_categoria_propuesta(
	id_categoria_propuesta int(50) primary key auto_increment,
    categoria varchar(255)
);
insert into Cat_categoria_propuesta values(1, "Seguridad");
insert into Cat_categoria_propuesta values(2, "Economia");
insert into Cat_categoria_propuesta values(3, "Sociedad");
insert into Cat_categoria_propuesta values(4, "Infraestructura");


/*11*/
create table Propuesta(
	id_propuesta int(50) primary key auto_increment,
    id_politico int(50),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    id_categoria_propuesta int(50),
    nombre varchar(255),
    descripcion varchar(255),
    foreign key (id_politico) references Politico(id_politico),
    foreign key (id_categoria_propuesta) references Cat_categoria_propuesta(id_categoria_propuesta)
);
insert into Propuesta values(1, 1, null, 1, "algo1", "algo acerca de seguridad");
insert into Propuesta values(2, 1, null, 2, "algo2", "algo acerca de economia");
insert into Propuesta values(3, 1, null, 3, "algo3", "algo acerca de sociedad");
insert into Propuesta values(4, 2, null, 4, "algo4", "algo acerca de infraestructura");
insert into Propuesta values(5, 2, null, 1, "algo5", "algo acerca de seguridad 2");
insert into Propuesta values(6, 3, null, 2, "algo6", "algo acerca de economia 2");
insert into Propuesta values(7, 3, null, 3, "algo7", "algo acerca de sociedad 2");
insert into Propuesta values(8, 4, null, 4, "algo8", "algo acerca de infraestructura 2");

DROP PROCEDURE IF EXISTS propuestas_politico; ELSE
DELIMITER //
CREATE PROCEDURE propuestas_politico(in idX int) BEGIN
	select
	Propuesta.id_propuesta,
	Propuesta.fecha,
	Propuesta.id_politico,
	Cat_categoria_propuesta.categoria,
    Propuesta.nombre,
	Propuesta.descripcion
	from Propuesta
	inner join  Cat_categoria_propuesta on Cat_categoria_propuesta.id_categoria_propuesta = Propuesta.id_categoria_propuesta
    where Propuesta.id_politico=idX;
END //
DELIMITER ;
/*call propuestas_politico(1);*/



/*12*/
create table Historial(
	id_historial int(50) primary key auto_increment,
    id_politico int(50),
    fecha date,
    nombre varchar(255),
    descripcion varchar(255),
    foreign key (id_politico) references Politico(id_politico)
);
insert into Historial values(null, 1, DATE("2017-06-01"), "hecho1", "Algun hecho historico 1");
insert into Historial values(null, 2, DATE("2017-06-02"), "hecho2", "Algun hecho historico 2");
insert into Historial values(null, 2, DATE("2017-06-03"), "hecho3", "Algun hecho historico 3");
insert into Historial values(null, 2, DATE("2017-06-04"), "hecho4", "Algun hecho historico 4");
insert into Historial values(null, 3, DATE("2017-06-05"), "hecho5", "Algun hecho historico 5");
insert into Historial values(null, 3, DATE("2017-06-06"), "hecho6", "Algun hecho historico 6");
insert into Historial values(null, 4, DATE("2017-06-07"), "hecho7", "Algun hecho historico 7");
insert into Historial values(null, 1, DATE("2017-06-08"), "hecho8", "Algun hecho historico 8");

DROP PROCEDURE IF EXISTS historial_politico; ELSE
DELIMITER //
CREATE PROCEDURE historial_politico(in idX int) BEGIN
	select
	Historial.id_historial,
	Historial.fecha,
	Historial.id_politico,
    Historial.nombre,
	Historial.descripcion
	from Historial
	where Historial.id_politico=idX;
END //
DELIMITER ;
/*call historial_politico(1);*/

/*13*/
create table Rel_Like_propuesta_usuario(
	id_like_propuesta_usuario int(50) primary key auto_increment,
    id_propuesta int(50),
    id_usuario int(50),
    foreign key (id_propuesta) references Propuesta(id_propuesta),
    foreign key (id_usuario) references Usuario(id_usuario)
);

DROP PROCEDURE IF EXISTS insert_or_delete_like; ELSE
DELIMITER //
CREATE PROCEDURE insert_or_delete_like(in id_propuestaX int, id_usuarioX int) BEGIN   
                            
    select COUNT(*) INTO @contador from Rel_Like_propuesta_usuario  where id_usuario = id_usuarioX &&  id_propuesta =  id_propuestaX;
    
	IF ( SELECT @contador = 0 ) THEN                                  
		insert into Rel_Like_propuesta_usuario values(null, id_propuestaX, id_usuarioX);                            
    ELSE                                                              
		DELETE FROM Rel_Like_propuesta_usuario WHERE id_usuario = id_usuarioX &&  id_propuesta =  id_propuestaX;
    END IF;                              
END //
DELIMITER ;
call insert_or_delete_like(1,1);

DROP PROCEDURE IF EXISTS count_likes; ELSE
DELIMITER //
CREATE PROCEDURE count_likes(in id_propuestaX int) BEGIN   
	
	select count(*) from Rel_Like_propuesta_usuario  where id_propuesta =  id_propuestaX;     
    
END //
DELIMITER ;
/*select id_propuesta, count(*) from Rel_Like_propuesta_usuario  group by id_propuesta; */     
/*call count_likes(1);*/


create table Propuesta_politico(
	id_politico int(50) primary key auto_increment,
    nombre varchar(255),
    id_partido int(2),
    fecha_incio_politica varchar(255),
    id_tipo_politico int(2),
    motivacion varchar(255),
    id_lugar int(2),
    id_usuario int(100),
    foreign key (id_usuario) references Usuario(id_usuario),
    foreign key (id_partido) references Cat_partido(id_partido),
    foreign key (id_tipo_politico) references Cat_tipo_politico(id_tipo_politico),
    foreign key (id_lugar) references Cat_lugar(id_lugar)
);
insert into Propuesta_politico values(null, "Enrique Peña Nieto", 4, DATE("2017-06-05"), 1, 'Movemos a mexico', 33,1);

CREATE OR REPLACE VIEW pendientes_politico AS
select 
Propuesta_politico.id_politico,
Propuesta_politico.nombre, 
Cat_partido.partido,
Propuesta_politico.fecha_incio_politica,
Cat_tipo_politico.tipo,
Propuesta_politico.motivacion,
Cat_lugar.lugar,   
Usuario.id_usuario,
Usuario.nombre_usuario
from Propuesta_politico
inner join Usuario on Usuario.id_usuario = Propuesta_politico.id_usuario 
inner join Cat_partido on Cat_partido.id_partido = Propuesta_politico.id_partido
inner join Cat_tipo_politico on Cat_tipo_politico.id_tipo_politico = Propuesta_politico.id_tipo_politico
inner join Cat_lugar on Cat_lugar.id_lugar = Propuesta_politico.id_lugar;
/*select * from pendientes_politico;*/

DROP PROCEDURE IF EXISTS insert_politico; ELSE
DELIMITER //
CREATE PROCEDURE insert_politico(in id_propuestaX int) BEGIN  
                            
	select nombre                 INTO @nombre from Propuesta_politico  where Propuesta_politico.id_politico = id_propuestaX;
    select id_partido             INTO @id_partido from Propuesta_politico  where Propuesta_politico.id_politico = id_propuestaX;
    select fecha_incio_politica   INTO @fecha_incio_politica from Propuesta_politico  where Propuesta_politico.id_politico = id_propuestaX;
    select id_tipo_politico       INTO @id_tipo_politico from Propuesta_politico  where Propuesta_politico.id_politico = id_propuestaX;
    select motivacion             INTO @motivacion from Propuesta_politico  where Propuesta_politico.id_politico = id_propuestaX;
    select id_lugar               INTO @id_lugar from Propuesta_politico  where Propuesta_politico.id_politico = id_propuestaX;
	
    IF (@id_partido) THEN                                  
		insert into Politico values(null, @nombre, @id_partido, @fecha_incio_politica, @id_tipo_politico, @motivacion, @id_lugar);                         
		delete from Propuesta_politico  where Propuesta_politico.id_politico = id_propuestaX; 
    ELSE                                                              
		select "Accion no valida";
    END IF;                              
END //
DELIMITER ;
/*call insert_politico(1);*/


create table Propuesta_historial(
	id_historial int(50) primary key auto_increment,
    id_politico int(50),
    fecha date,
    nombre varchar(255),
    descripcion varchar(255),
    id_usuario int(100),
    foreign key (id_usuario) references Usuario(id_usuario),
    foreign key (id_politico) references Politico(id_politico)
);
insert into Propuesta_historial values(null, 1, DATE("2017-06-01"), "hechoDespues", "Algun hecho historico 1", 1);

CREATE OR REPLACE VIEW pendientes_historial AS
select 
Propuesta_historial.id_historial,
Propuesta_historial.fecha,
Propuesta_historial.id_politico,
Propuesta_historial.nombre,
Propuesta_historial.descripcion,
Usuario.id_usuario,
Usuario.nombre_usuario
from Propuesta_historial
inner join Usuario on Usuario.id_usuario = Propuesta_historial.id_usuario;
/*select * from pendientes_historial;*/

DROP PROCEDURE IF EXISTS insert_historial; ELSE
DELIMITER //
CREATE PROCEDURE insert_historial(in id_propuestaX int) BEGIN  
                            
    select id_politico            INTO @id_politicoD from Propuesta_historial  where Propuesta_historial.id_historial = id_propuestaX;
    select fecha                  INTO @fechaD from Propuesta_historial  where Propuesta_historial.id_historial = id_propuestaX;
    select nombre                 INTO @nombre from Propuesta_historial  where Propuesta_historial.id_historial = id_propuestaX;
    select descripcion            INTO @descripcion from Propuesta_historial  where Propuesta_historial.id_historial = id_propuestaX;
    
	IF (@id_politicoD) THEN                                  
		insert into Historial values(null, @id_politicoD, @fechaD, @nombre, @descripcion);                          
		delete from Propuesta_historial  where Propuesta_historial.id_historial = id_propuestaX; 
    ELSE                                                              
		select "Accion no realizada";
    END IF;                              
END //
DELIMITER ;
/*call insert_historial(1);*/


create table Propuesta_propuesta(
	id_propuesta int(50) primary key auto_increment,
    id_politico int(50),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    id_categoria_propuesta int(50),
    nombre varchar(255),
    descripcion varchar(255),
	id_usuario int(100),
    foreign key (id_usuario) references Usuario(id_usuario),
    foreign key (id_politico) references Politico(id_politico),
    foreign key (id_categoria_propuesta) references Cat_categoria_propuesta(id_categoria_propuesta)
);
insert into Propuesta_propuesta values(null, 1, null, 1,"algoDespues","descripcion", 1);

CREATE OR REPLACE VIEW pendientes_propuesta AS
select
Propuesta_propuesta.id_propuesta,
Propuesta_propuesta.fecha,
Propuesta_propuesta.id_politico,
Cat_categoria_propuesta.categoria,
Propuesta_propuesta.nombre,
Propuesta_propuesta.descripcion,
Usuario.id_usuario,
Usuario.nombre_usuario
from Propuesta_propuesta
inner join Usuario on Usuario.id_usuario = Propuesta_propuesta.id_usuario
inner join  Cat_categoria_propuesta on Cat_categoria_propuesta.id_categoria_propuesta = Propuesta_propuesta.id_categoria_propuesta;

/*select * from pendientes_propuesta;*/

DROP PROCEDURE IF EXISTS insert_propuesta; ELSE
DELIMITER //
CREATE PROCEDURE insert_propuesta(in id_propuestaX int) BEGIN   
                            
    select id_politico            INTO @id_politicoD from Propuesta_propuesta  where Propuesta_propuesta.id_propuesta = id_propuestaX;
    select fecha                  INTO @fechaD from Propuesta_propuesta  where Propuesta_propuesta.id_propuesta = id_propuestaX;
    select id_categoria_propuesta INTO @id_categoria_propuestaD from Propuesta_propuesta  where Propuesta_propuesta.id_propuesta = id_propuestaX;
    select nombre                 INTO @nombre from Propuesta_propuesta  where Propuesta_propuesta.id_propuesta = id_propuestaX;
    select descripcion            INTO @descripcion from Propuesta_propuesta  where Propuesta_propuesta.id_propuesta = id_propuestaX;select fecha INTO @fechaD from Propuesta_propuesta  where Propuesta_propuesta.id_propuesta = id_propuestaX;
    
	IF (@id_politicoD) THEN                                  
		insert into Propuesta values(null, @id_politicoD, @fechaD, @id_categoria_propuestaD, @nombre, @descripcion);                          
		delete from Propuesta_propuesta  where Propuesta_propuesta.id_propuesta = id_propuestaX; 
    ELSE                                                              
		select "Accion no realizada";
    END IF;                              
END //
DELIMITER ;
/*call insert_propuesta(1);*/




/**************************************************************************************************/
create table Rel_eleccion_usuario(
	id_eleccion_usuario int(50) primary key auto_increment,
    id_politico int(50),
    id_usuario int(50),
    foreign key (id_politico) references Politico(id_politico),
    foreign key (id_usuario) references Usuario(id_usuario)
);

DROP PROCEDURE IF EXISTS insert_or_update_eleccion; ELSE
DELIMITER //
CREATE PROCEDURE insert_or_update_eleccion(in id_usuarioX int, id_politicoX int) BEGIN   
 	
	select id_tipo_politico into @tipo from politico where id_politico = id_politicoX;
    IF(select @tipo = 1)THEN
		select 'Intentaste darle tu voto a alguien que ya esta en un cargo';
    ELSE
		select id_lugar into @lugar  from politico where id_politico = id_politicoX;
		select  
		count(*)
		into @contador
		from Rel_eleccion_usuario 
		inner join Politico on politico.id_politico = Rel_eleccion_usuario.id_politico
		where Rel_eleccion_usuario.id_usuario = id_usuarioX  && Politico.id_lugar = @lugar;                      
		
		IF ( SELECT @contador = 0 ) THEN                                  
			insert into Rel_eleccion_usuario values(null, id_politicoX, id_usuarioX);                            
		ELSE                                                              
			UPDATE Rel_eleccion_usuario SET id_politico = id_politicoX WHERE id_usuario = id_usuarioX;
		END IF;      
    END IF;
                            
END //
DELIMITER ;
call insert_or_update_eleccion(1,2);
call insert_or_update_eleccion(2,3);
call insert_or_update_eleccion(3,3);

DROP PROCEDURE IF EXISTS count_eleccion; ELSE
DELIMITER //
CREATE PROCEDURE count_eleccion(in id_lugarX int) BEGIN   
	select  
    Politico.*,
    count(*) as 'votos'
    from Rel_eleccion_usuario 
    inner join Politico on politico.id_politico = Rel_eleccion_usuario.id_politico
    where Politico.id_lugar = id_lugarX
    group by Rel_eleccion_usuario.id_politico;   
END //
DELIMITER ;
call count_eleccion(12);

create table Mensaje(
	id_mensaje int(50) primary key auto_increment, 
	id_destinatario int(50), 
	id_remitente  int(50), 
	mensaje varchar(255), 
	fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    foreign key (id_remitente) references Usuario(id_usuario),
    foreign key (id_destinatario) references Usuario(id_usuario)
);
insert Mensaje values(null, 2, 1, 'Mensaje 1', null);
insert Mensaje values(null, 3, 1, 'Mensaje 2', null);
insert Mensaje values(null, 1, 3, 'Mensaje 3', null);
insert Mensaje values(null, 3, 1, 'Mensaje 4', null);


DROP PROCEDURE IF EXISTS conversaciones; ELSE
DELIMITER //
CREATE PROCEDURE conversaciones(in id_usuarioX int) BEGIN   
	select id_remitente, nombre_usuario from Mensaje inner join Usuario on Usuario.id_usuario = id_remitente where id_destinatario = id_usuarioX group by id_remitente
	UNION
	select id_destinatario, nombre_usuario from Mensaje inner join Usuario on Usuario.id_usuario = id_destinatario where id_remitente = id_usuarioX group by id_destinatario;
END //
DELIMITER ;
call conversaciones(1);
select avatar,	curp, email,fecha_registro,	id_tipo_usuario, id_usuario,localidad, nombre_usuario, puntos from Usuario where email = "drasa_00@hotmail.com"



