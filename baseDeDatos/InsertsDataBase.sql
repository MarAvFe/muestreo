

-- Inserción en catálogo de SamplingType
INSERT INTO sampling.SamplingType(name,initials)
VALUES('Crew Balance','CB');
INSERT INTO sampling.SamplingType(name,initials)
VALUES('5 Minute Rating','FMR');
INSERT INTO sampling.SamplingType(name,initials)
VALUES('Muestreo del Trabajo','MT');
INSERT INTO sampling.SamplingType(name,initials)
VALUES('Work Sampling','WS');

-- Inserción en catálogo User
INSERT INTO sampling.User(cedula,name,lastname,email,phone,pwd)
VALUES('106720123','Michael','Mena','mikemena@gmail.com','84572163','mikem25');
INSERT INTO sampling.User(cedula,name,lastname,email,phone,pwd)
VALUES('301480674','Andrea','Ramírez','andreramirez@gmail.com','86974236','andreram30');
INSERT INTO sampling.User(cedula,name,lastname,email,phone,pwd)
VALUES('305980215','Camila','Alvarez','camialvarez@gmail.com','86489723','camialva123');

-- Inserción en catálogo Distraction
-- el bit en 0 es un NO.
INSERT INTO sampling.ImprodAct(name,description,isCollaborative)
VALUES('Esperando','El trabajador se encuentra esperando por algún recurso.',1);
INSERT INTO sampling.ImprodAct(name,description,isCollaborative)
VALUES('Comiendo','El trabajador está haciendo uso del tiempo para comer.',0);
INSERT INTO sampling.ImprodAct(name,description,isCollaborative)
VALUES('WC','El trabajador se encuentra ausento por utilización del servicio sanitario.',0);
INSERT INTO sampling.ImprodAct(name,description,isCollaborative)
VALUES('Caminando','El trabajador se desplaza de un lado a otro.',1);


-- Inserción en catálogo Worker
INSERT INTO sampling.Worker(name,position,description)
VALUES('Nombre1','posicion1','descripcion1');
INSERT INTO sampling.Worker(name,position,description)
VALUES('Nombre2','posicion2','descripcion2');
INSERT INTO sampling.Worker(name,position,description)
VALUES('Nombre3','posicion3','descripcion3');
INSERT INTO sampling.Worker(name,position,description)
VALUES('Nombre4','posicion4','descripcion4');
INSERT INTO sampling.Worker(name,position,description)
VALUES('Nombre5','posicion5','descripcion5');



-- Inserción en catálogo Group
INSERT INTO sampling.Group(name)
VALUES('Edificio');
INSERT INTO sampling.Group(name)
VALUES('Cuadrilla');


-- Insercion en catalogo trail
INSERT INTO sampling.Trail(hour)
VALUES('8:00:00');
INSERT INTO sampling.Trail(hour)
VALUES('10:20:00');
INSERT INTO sampling.Trail(hour)
VALUES('12:45:00');
INSERT INTO sampling.Trail(hour)
VALUES('3:15:00');

-- insercion en tabla group_has_trail
INSERT INTO sampling.Group_has_Trail(Group_idGroup,Trail_idTrail)
VALUES(2,1);
INSERT INTO sampling.Group_has_Trail(Group_idGroup,Trail_idTrail)
VALUES(2,3);
INSERT INTO sampling.Group_has_Trail(Group_idGroup,Trail_idTrail)
VALUES(1,1);
INSERT INTO sampling.Group_has_Trail(Group_idGroup,Trail_idTrail)
VALUES(1,4);
INSERT INTO sampling.Group_has_Trail(Group_idGroup,Trail_idTrail)
VALUES(2,4);

-- Inserción Sampling
INSERT INTO sampling.Sampling(description, live,  estimatedObservations, calculatedObservations, improductivityGrade, name,SamplingType_idSamplingType)
VALUES('Ejecutado para muestrear la construcción del segundo piso de la escuela de mantenimiento industrial, en el período de vacaciones 2015-2016, a cargo de la constructora Quirón y Román', 0, 15, 8, 40,'ManteQ&R',3);
INSERT INTO sampling.Sampling(description, live,  estimatedObservations, calculatedObservations, improductivityGrade, name,SamplingType_idSamplingType)
VALUES('Ejecutado para muestrear la construcción del edificio D3, en el período 2016, a cargo de la constructora Sánchez-Carvajal', 0, 50, 41, 60,'D3S&C',1);

-- insercion en tabla sampling_has_group
INSERT INTO sampling.Sampling_has_Group(Sampling_idSampling,Group_idGroup)
VALUES(1,2);
INSERT INTO sampling.Sampling_has_Group(Sampling_idSampling,Group_idGroup)
VALUES(2,1);

-- user_has_samplings
-- el bit en 0 significa que no
INSERT INTO sampling.User_has_Sampling(User_idUser,Sampling_idSampling,isOwner)
VALUES(1,1,1);
INSERT INTO sampling.User_has_Sampling(User_idUser,Sampling_idSampling,isOwner)
VALUES(2,1,0);
INSERT INTO sampling.User_has_Sampling(User_idUser,Sampling_idSampling,isOwner)
VALUES(3,2,1);
INSERT INTO sampling.User_has_Sampling(User_idUser,Sampling_idSampling,isOwner)
VALUES(1,2,0);

-- comments
INSERT INTO sampling.Comments(comment,date,User_idUser)
VALUES('Feriado Anexión de Guanacaste','2015-07-25',1);
INSERT INTO sampling.Comments(comment,date,User_idUser)
VALUES('Feriado 02 de Agosto','2016-08-02',3);

-- Sampling_has_comments
INSERT INTO sampling.Sampling_has_Comments(Sampling_idSampling, Comments_idComments,Comments_User_idUser)
VALUES(1,1,1);
INSERT INTO sampling.Sampling_has_Comments(Sampling_idSampling, Comments_idComments,Comments_User_idUser)
VALUES(2,2,3);

-- Inserción Observation
INSERT INTO sampling.Observation(date, hasData, isProductive, isCancelled, Improdact_idImprodAct, Worker_idWorker, User_idUser)
VALUES('2015-05-21',0,0,0,1,2,1);

INSERT INTO sampling.Observation(date, hasData, isProductive, isCancelled, Improdact_idImprodAct, Worker_idWorker, User_idUser)
VALUES('2015-10-09',1,0,0,2,3,2);

INSERT INTO sampling.Observation(date, hasData, isProductive, isCancelled, Improdact_idImprodAct, Worker_idWorker, User_idUser)
VALUES('2016-07-15',0,0,0,3,1,3);

-- trail_has_observation
INSERT INTO sampling.Trail_has_Observation(Trail_idTrail, Observation_idObservation)
VALUES(1,1);
INSERT INTO sampling.Trail_has_Observation(Trail_idTrail, Observation_idObservation)
VALUES(1,3);
INSERT INTO sampling.Trail_has_Observation(Trail_idTrail, Observation_idObservation)
VALUES(3,3);
INSERT INTO sampling.Trail_has_Observation(Trail_idTrail, Observation_idObservation)
VALUES(1,2);
INSERT INTO sampling.Trail_has_Observation(Trail_idTrail, Observation_idObservation)
VALUES(4,2);
