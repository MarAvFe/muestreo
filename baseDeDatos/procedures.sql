DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `getDefParam`(pId_Sampling int, pDescription VARCHAR(255),pIdSamplingType int)
BEGIN
 SELECT p_definitive, q_definitive, error_definitive, n_definitive,z_definitive
 from Sampling
 WHERE idSampling = pId_Sampling and description = pDescription and SamplingType_idSamplingType = pIdSamplingType ;
 END //
 DELIMITER ;

DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getPreParam`(pId_Sampling int, pDescription VARCHAR(255),pIdSamplingType int)
 BEGIN
 SELECT p_preliminar, q_preliminar, n_preliminar
 from Sampling
 WHERE idSampling = pId_Sampling and description = pDescription and SamplingType_idSamplingType = pIdSamplingType ;
 END //
DELIMITER ;

DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getSamplingId`(pName VARCHAR(8))
BEGIN
 SELECT idSampling
 from Sampling
 WHERE name = pName;
 END //
 DELIMITER ;

DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getSamplingName`()
BEGIN
 SELECT name
 from Sampling
 ORDER BY idSampling;
 END //
 DELIMITER ;

 DELIMITER //
CREATE PROCEDURE pInsert_Group (IN pname varchar(45), IN pid_sampling INT)
BEGIN
    insert into `Group` (name, Sampling_idSampling)
    values (pname, pid_sampling);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE pInsert_Sampling (IN pdescription varchar(255),IN pname varchar(8),IN pidsampling_type int)
BEGIN
    insert into Sampling(description,
						name,
						SamplingType_idsamplingType,
                        live,
						isPreliminarSampling)
    values (pdescription,pname,pidsampling_type, 1, 1);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE pInsert_Schedule (IN pinitial_hour TIME, IN pfinal_hour TIME, IN pid_sampling INT)
BEGIN
    insert into Schedule (initial_hour,final_hour, Sampling_idSampling)
    values (pinitial_hour,pfinal_hour,pid_sampling);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE pInsert_Trail (IN phour time, IN pday_number int, IN pid_sampling int)
BEGIN
    insert into Trail (hour, day_number, Sampling_idSampling)
    values (phour, pday_number, pid_sampling);
END //
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getActivities`()
BEGIN
	select name, description, type from Activity;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `createBasicSampling`(
	in pDescription varchar(255),
	in pName varchar(8),
	in pLive bit,
	in pSamplingType_idSamplingType int
)
BEGIN
	INSERT INTO `sampling`.`Sampling`
(
`description`,
`live`,
`name`,
`SamplingType_idSamplingType`)
VALUES
(pDescription, pLive, pName, pSamplingType_idSamplingType);
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `registerUser`(
	in pCedula varchar(12),
	in pName varchar(45),
	in pLastname varchar(45),
	in pEmail varchar(255),
	in pPhone varchar(12),
	in pPwd varchar(45)
)
BEGIN
	INSERT INTO `sampling`.`User`
	(`cedula`,
	`name`,
	`lastname`,
	`email`,
	`phone`,
	`pwd`)
	VALUES
	(pCedula, pName, pLastname, pEmail, pPhone, pPwd);
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `authUser`(
	pUser varchar(255),
    pPwd varchar(45)
)
BEGIN
	Select cedula
    From User
    Where (cedula = pUser or email = pUser) and pwd = pPwd;
END$$
DELIMITER ;

DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `pUpDefParamsSampling`(pId_Sampling int, pDescription varchar(255),
	pIdSamplingType int,
	pp_defitive double,
	pq_definitive double,
	perror_definitive double,
	pn_definitive int,
	pz_definitive double)
BEGIN
	UPDATE Sampling
    SET
		p_definitive = pp_definitive,
		q_definitive = pq_definitive,
		error_definitive = perror_definitive,
		n_definitive = pn_definitive,
		z_definitive = pz_definitive
	WHERE idSampling = pId_Sampling AND description = pDescription AND SamplingType_idSamplingType =  pIdSamplingType;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE pUpdate_DefSampling (IN pId_Sampling int,
	pp_def double,
	pq_def double,
	perror_def double,
	pn_def int,
	pz_def double,
	pabs_precision_def double,
	prelative_precision_def double)
BEGIN
	UPDATE Sampling
    SET isPreliminarSampling = 0,
		p_definitive = pp_def,
		q_definitive = pq_def,
		error_definitive = perror_def,
		n_definitive = pn_def,
		z_definitive = pz_def,
		abs_precision_definitive = pabs_precision_def,
		relative_precision_definitive = prelative_precision_def
	WHERE idSampling = pId_Sampling;
END //
DELIMITER ;

DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `pUpPreParamsSampling`(pId_Sampling int, pDescription varchar(255),
	pIdSamplingType int,
	pp_preliminar double,
	pq_preliminar double,
	pn_preliminar int)
BEGIN
	UPDATE Sampling
    SET
		p_preliminar = pp_preliminar,
		q_preliminar = pq_preliminar,
		n_preliminar = pn_preliminar
	WHERE idSampling = pId_Sampling AND description = pDescription AND SamplingType_idSamplingType =  pIdSamplingType;
END//
DELIMITER ;

DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `pUpdate_SamplingPreParams`(pId_Sampling int, pDescription varchar(255),
	pIdSamplingType int,
        pp_preliminar double,
	pq_preliminar double,
	perror_preliminar double,
	pn_preliminar int,
	pz_preliminar double)
BEGIN
	UPDATE Sampling
    SET samplingp_preliminar = pp_preliminar,
		q_preliminar = pq_preliminar,
		error_preliminar = perror_preliminar,
		n_preliminar = pn_preliminar,
		z_preliminar = pz_preliminar
	WHERE idSampling = pId_Sampling and description = pDescription and SamplingType_idSamplingType = pIdSamplingType;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE pUpdate_PreSampling (IN pId_Sampling int, 	pestimatedTrailTime int,
	pp_preliminar double,
	pq_preliminar double,
	perror_preliminar double,
	pn_preliminar int,
	pz_preliminar double,
	pabs_precision_preliminar double,
	prelative_precision_preliminar double)
BEGIN
	UPDATE Sampling
    SET estimatedTrailTime_Minutes = pestimatedTrailTime,
		p_preliminar = pp_preliminar,
		q_preliminar = pq_preliminar,
		error_preliminar = perror_preliminar,
		n_preliminar = pn_preliminar,
		z_preliminar = pz_preliminar,
		abs_precision_preliminar = pabs_precision_preliminar,
		relative_precision_preliminar = prelative_precision_preliminar
	WHERE idSampling = pId_Sampling;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE pUpdate_Sampling (IN pId_Sampling int, 	pestimatedTrailTime int,
	pp_preliminar double,
	pq_preliminar double,
	perror_preliminar double,
	pn_preliminar int,
	pz_preliminar double,
	pabs_precision_preliminar double,
	prelative_precision_preliminar double)
BEGIN
	UPDATE Sampling
    SET estimatedTrailTime = pestimatedTrailTime,
		p_preliminar = pp_preliminar,
		q_preliminar = pq_preliminar,
		error_preliminar = perror_preliminar,
		n_preliminar = pn_preliminar,
		z_preliminar = pz_preliminar,
		abs_precision_preliminar = pabs_precision_preliminar,
		relative_precision_preliminar = prelative_precision_preliminar
	WHERE idSampling = pId_Sampling;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE getDescIdSamp(pId_Sampling int)
BEGIN
 SELECT description,SamplingType_idSamplingType
 from Sampling
 WHERE idSampling = pId_Sampling;
 END //
 DELIMITER ;

DELIMITER //
CREATE PROCEDURE getIdSampDescIdSampType(pName varchar(8))
BEGIN
 SELECT idSampling, description, SamplingType_idSamplingType
 from Sampling
 WHERE name = pName;
 END //
 DELIMITER ;
