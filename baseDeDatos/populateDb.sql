-- Inserción en catálogo de SamplingType
INSERT INTO sampling.SamplingType(name,initials)VALUES
    ('Crew Balance','CB'),
    ('5 Minute Rating','FMR'),
    ('Muestreo del Trabajo','MT'),
    ('Work Sampling','WS');

-- Inserción en catálogo User
INSERT INTO sampling.User(cedula,name,lastname,email,phone,pwd)VALUES
    ('106720123','Michael','Mena','mikemena@gmail.com','84572163','mikem25'),
    ('301480674','Andrea','Ramírez','andreramirez@gmail.com','86974236','andreram30'),
    ('305980215','Camila','Alvarez','camialvarez@gmail.com','86489723','camialva123');

-- Inserción en catálogo Activity
INSERT INTO sampling.Activity(name,description,type)VALUES
    ('Esperando','El trabajador se encuentra esperando por algún recurso.',1),
    ('Comiendo','El trabajador está haciendo uso del tiempo para comer.',0),
    ('WC','El trabajador se encuentra ausento por utilización del servicio sanitario.',0),
    ('Caminando','El trabajador se desplaza de un lado a otro.',2);

-- Inserción Sampling
INSERT INTO sampling.Sampling(description,live,name,SamplingType_idSamplingType,n_preliminar,n_definitive)VALUES
    ('Ejecutado para muestrear la construcción del segundo piso de la escuela de mantenimiento industrial, en el período de vacaciones 2015-2016, a cargo de la constructora Quirós y Román', 0, 'ManteQ&R', 1,30,10),
    ('Ejecutado para muestrear la construcción del edificio D3, en el período 2016, a cargo de la constructora Sánchez-Carvajal', 0, 'D3S&C', 2,15,20);

-- Inserción en catálogo Group
INSERT INTO sampling.Group(name, Sampling_idSampling)VALUES
    ('Cuadrilla',1),
    ('Edificio',2),
    ('Edificio',2),
    ('Edificio',2);

-- Inserción en catálogo Worker
INSERT INTO sampling.Worker(name,position,description, Group_idGroup)VALUES
    ('Nombre1','posicion1','descripcion1',1),
    ('Nombre2','posicion2','descripcion2',1),
    ('Nombre3','posicion3','descripcion3',2),
    ('Nombre4','posicion4','descripcion4',2),
    ('Nombre5','posicion5','descripcion5',3),
    ('Nombre6','posicion6','descripcion6',3),
    ('Nombre7','posicion7','descripcion7',4);


-- Insercion en catalogo trail
INSERT INTO sampling.Trail(hour, Sampling_idSampling)VALUES
    ('8:00:00', 1),
    ('10:20:00', 1),
    ('12:45:00', 2),
    ('3:15:00', 2);

-- comments
INSERT INTO sampling.Comment(comment,date,User_idUser,isNotification)VALUES
    ('Feriado Anexión de Guanacaste','2015-07-25',1,1),
    ('Feriado 02 de Agosto','2016-08-02',3,0);

-- Inserción Observation
INSERT INTO sampling.Observation(date, hasData, isProductive, isCancelled, Activity_idActivity, Worker_idWorker, User_idUser, Trail_idTrail)VALUES
    ('2015-05-21',0,0,0,1,1,3,1),
    ('2015-10-09',1,0,0,2,2,1,3),
    ('2016-07-15',0,0,0,3,2,2,3);

-- Inserción Sampling_has_User
INSERT INTO sampling.Sampling_has_User(Sampling_idSampling, User_idUser, isAdmin)VALUES
    (1,1,1),
    (2,2,1),
    (1,3,0);
