-- Inserción en catálogo User
INSERT INTO sampling.User(cedula,name,lastname,email,phone,pwd)VALUES
    ('106720123','Michael','Mena','mikemena@gmail.com','84572163','mikem25'),
    ('301480674','Andrea','Ramírez','andreramirez@gmail.com','86974236','andreram30'),
    ('305980215','Camila','Alvarez','camialvarez@gmail.com','86489723','camialva123'),
    ('100320253','Miranda','Barlow','mirba@gmail.com','89123489','$2a$10$jqFr9cjmWQ32yqPcwazxteieSk..Vb1qFJ2qlBW7jSBY/6Nn4NPxS');

-- Inserción en catálogo Activity
INSERT INTO sampling.Activity(name,description,type)VALUES
    ('Esperando','El trabajador se encuentra esperando por algún recurso.',1),
    ('Comiendo','El trabajador está haciendo uso del tiempo para comer.',0),
    ('WC','El trabajador se encuentra ausento por utilización del servicio sanitario.',0),
    ('Caminando','El trabajador se desplaza de un lado a otro.',2),
    ('Sosteniendo escalera','El trabajador se encuentra ayudando a un compañero.',2),
    ('Viendo el celular','El trabajador está usando su celular en tiempo de trabajo.',2);
-- Inserción SampledProfile
INSERT INTO `sampling`.`SampledProfile`(`name`,`description`)VALUES
    ('Cuadrilla','Contratados bajo estándares de calidad elevados.'),
    ('Equipo','Para la instalación electrica en tema de calidad.'),
    ('Aulas','Del edificio B2');

-- Inserción Sampling
INSERT INTO sampling.Sampling(description,live,name,SamplingType_idSamplingType,n_preliminar,n_definitive,SampledProfile_idSampledProfile, error_preliminar)VALUES
    ('Ejecutado para muestrear la construcción del segundo piso de la escuela de mantenimiento industrial, en el período de vacaciones 2015-2016, a cargo de la constructora Quirós y Román', 0, 'ManteQR', 1,30,10,1,6),
    ('Ejecutado para muestrear la construcción del edificio D3, en el período 2016, a cargo de la constructora Sánchez-Carvajal', 0, 'D3SC', 2,15,20,2,5),
    ('Agregado especialmente para Miranda', 1, 'NuNombre',1,15,20,3,3);

-- Inserción Comment
INSERT INTO sampling.Comment(comment,date,User_idUser,isNotification,Sampling_idSampling)VALUES
    ('Feriado Anexión de Guanacaste','2017-11-04',1,1,1),
    ('Feriado 02 de Agosto','2016-08-02',3,0,2);


INSERT INTO Trail(hour, Sampling_idSampling, User_idUser)
VALUES('2017-11-03 14:05:00',1,1);

insert into Observation(date, Trail_idTrail, Activity_idActivity, User_idUser)VALUES
    ('2017-11-03 14:05:03', 1, 1, 2),
    ('2017-11-03 14:05:08', 1, 4, 2),
    ('2017-11-03 14:05:35', 1, 2, 1),
    ('2017-11-03 14:05:35', 1, 1, 1),
    ('2017-11-03 14:05:35', 1, 1, 1),
    ('2017-11-03 14:06:01', 1, 1, 2),
    ('2017-11-04 14:06:20', 1, 2, 2),
    ('2017-11-04 14:06:20', 1, 2, 2),
    ('2017-11-04 14:06:20', 1, 2, 2),
    ('2017-11-04 14:06:20', 1, 2, 2),
    ('2017-11-04 14:06:20', 1, 4, 2),
    ('2017-11-04 14:06:20', 1, 4, 2),
    ('2017-11-04 14:06:20', 1, 2, 2),
    ('2017-11-04 14:06:40', 1, 5, 3),
    ('2017-11-05 14:06:20', 1, 2, 2),
    ('2017-11-05 14:06:20', 1, 2, 2),
    ('2017-11-05 14:06:20', 1, 4, 2),
    ('2017-11-05 14:06:20', 1, 4, 2),
    ('2017-11-05 14:06:20', 1, 2, 2),
    ('2017-11-05 14:06:20', 1, 4, 2),
    ('2017-11-05 14:06:20', 1, 4, 2),
    ('2017-11-05 14:06:20', 1, 2, 2),
    ('2017-11-05 14:06:40', 1, 5, 3);

insert into Observation(date, Trail_idTrail, Activity_idActivity, User_idUser)
VALUES(NOW(), 1, 6, 2);

insert into Observation(date, Trail_idTrail, Activity_idActivity, User_idUser)
VALUES(NOW()+1, 1, 4, 2);

insert into Observation(date, Trail_idTrail, Activity_idActivity, User_idUser)
VALUES(NOW()+2, 1, 4, 2);

insert into Observation(date, Trail_idTrail, Activity_idActivity, User_idUser)
VALUES(NOW()+3, 1, 4, 2);

insert into Observation(date, Trail_idTrail, Activity_idActivity, User_idUser)
VALUES(NOW()+4, 1, 5, 2);

-- Inserción Sampling_has_User
INSERT INTO sampling.Sampling_has_User(Sampling_idSampling, User_idUser, isAdmin)VALUES
    (1,4,1),
    (2,2,1),
    (1,3,0),
    (3,4,1);
