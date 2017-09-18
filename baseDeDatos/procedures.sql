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
