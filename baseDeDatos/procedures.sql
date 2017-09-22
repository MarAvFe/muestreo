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
