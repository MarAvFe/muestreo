-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

SHOW WARNINGS;
-- -----------------------------------------------------
-- Schema sampling
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `sampling` ;

-- -----------------------------------------------------
-- Schema sampling
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sampling` DEFAULT CHARACTER SET utf8 ;
SHOW WARNINGS;
USE `sampling` ;

-- -----------------------------------------------------
-- Table `sampling`.`Activity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sampling`.`Activity` (
  `idActivity` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `type` TINYINT(4) NOT NULL,
  PRIMARY KEY (`idActivity`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sampling`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sampling`.`User` (
  `idUser` INT(11) NOT NULL AUTO_INCREMENT,
  `cedula` VARCHAR(12) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(12) NOT NULL,
  `pwd` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`idUser`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sampling`.`SamplingType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sampling`.`SamplingType` (
  `idSamplingType` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `initials` VARCHAR(4) NOT NULL,
  PRIMARY KEY (`idSamplingType`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sampling`.`Sampling`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sampling`.`Sampling` (
  `idSampling` INT(11) NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(255) NOT NULL,
  `live` BIT(1) NOT NULL,
  `name` VARCHAR(8) NOT NULL,
  `SamplingType_idSamplingType` INT(11) NOT NULL,
  `estimatedTrailTime_Minutes` INT(11) NULL DEFAULT NULL,
  `isPreliminarSampling` BIT(1) NULL DEFAULT NULL,
  `p_preliminar` DOUBLE NULL DEFAULT NULL,
  `q_preliminar` DOUBLE NULL DEFAULT NULL,
  `error_preliminar` DOUBLE NULL DEFAULT NULL,
  `n_preliminar` INT(11) NULL DEFAULT NULL,
  `z_preliminar` DOUBLE NULL DEFAULT NULL,
  `p_definitive` DOUBLE NULL DEFAULT NULL,
  `q_definitive` DOUBLE NULL DEFAULT NULL,
  `error_definitive` DOUBLE NULL DEFAULT NULL,
  `n_definitive` INT(11) NULL DEFAULT NULL,
  `z_definitive` DOUBLE NULL DEFAULT NULL,
  `abs_precision_preliminar` DOUBLE NULL DEFAULT NULL,
  `abs_precision_definitive` DOUBLE NULL DEFAULT NULL,
  `relative_precision_preliminar` DOUBLE NULL DEFAULT NULL,
  `relative_precision_definitive` DOUBLE NULL DEFAULT NULL,
  PRIMARY KEY (`idSampling`, `SamplingType_idSamplingType`),
  INDEX `fk_Sampling_SamplingType1_idx` (`SamplingType_idSamplingType` ASC),
  CONSTRAINT `fk_Sampling_SamplingType1`
    FOREIGN KEY (`SamplingType_idSamplingType`)
    REFERENCES `sampling`.`SamplingType` (`idSamplingType`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sampling`.`Comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sampling`.`Comment` (
  `idComment` INT(11) NOT NULL AUTO_INCREMENT,
  `comment` VARCHAR(500) NOT NULL,
  `date` DATE NOT NULL,
  `User_idUser` INT(11) NOT NULL,
  `isNotification` BIT(1) NOT NULL,
  `Sampling_idSampling` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idComment`),
  INDEX `fk_Comments_User1_idx` (`User_idUser` ASC),
  INDEX `fk_Sampling_Comment_idx` (`Sampling_idSampling` ASC),
  CONSTRAINT `fk_Comments_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `sampling`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Sampling_Comment`
    FOREIGN KEY (`Sampling_idSampling`)
    REFERENCES `sampling`.`Sampling` (`idSampling`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sampling`.`Group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sampling`.`Group` (
  `idGroup` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `Sampling_idSampling` INT(11) NOT NULL,
  PRIMARY KEY (`idGroup`, `Sampling_idSampling`),
  INDEX `Sampling_idSampling_idGroup_fk_idx` (`Sampling_idSampling` ASC),
  CONSTRAINT `Sampling_idSampling_idGroup_fk`
    FOREIGN KEY (`Sampling_idSampling`)
    REFERENCES `sampling`.`Sampling` (`idSampling`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sampling`.`Trail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sampling`.`Trail` (
  `idTrail` INT(11) NOT NULL AUTO_INCREMENT COMMENT '			',
  `hour` TIME NULL DEFAULT NULL,
  `Sampling_idSampling` INT(11) NOT NULL,
  PRIMARY KEY (`idTrail`, `Sampling_idSampling`),
  INDEX `Sampling_idSampling_Trail_fk_idx` (`Sampling_idSampling` ASC),
  CONSTRAINT `Sampling_idSampling_Trail_fk`
    FOREIGN KEY (`Sampling_idSampling`)
    REFERENCES `sampling`.`Sampling` (`idSampling`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sampling`.`Worker`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sampling`.`Worker` (
  `idWorker` INT(11) NOT NULL AUTO_INCREMENT COMMENT '	',
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `position` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(45) NULL DEFAULT NULL,
  `Group_idGroup` INT(11) NOT NULL,
  PRIMARY KEY (`idWorker`, `Group_idGroup`),
  INDEX `fk_Group_idGroup_idx` (`Group_idGroup` ASC),
  CONSTRAINT `fk_Group_idGroup`
    FOREIGN KEY (`Group_idGroup`)
    REFERENCES `sampling`.`Group` (`idGroup`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sampling`.`Observation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sampling`.`Observation` (
  `idObservation` INT(11) NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `hasData` BIT(1) NOT NULL,
  `isProductive` BIT(1) NOT NULL,
  `isCancelled` BIT(1) NOT NULL,
  `Worker_idWorker` INT(11) NOT NULL,
  `User_idUser` INT(11) NOT NULL,
  `Trail_idTrail` INT(11) NOT NULL,
  `Activity_idActivity` INT(11) NOT NULL,
  PRIMARY KEY (`idObservation`, `User_idUser`, `Activity_idActivity`, `Trail_idTrail`, `Worker_idWorker`),
  INDEX `fk_Observation_Worker1_idx` (`Worker_idWorker` ASC),
  INDEX `fk_Observation_User1_idx` (`User_idUser` ASC),
  INDEX `fk_Observation_IdTrail_idx` (`Trail_idTrail` ASC),
  INDEX `fk_Observation_ImprodAct1_idx` (`Activity_idActivity` ASC),
  CONSTRAINT `fk_Observation_IdTrail`
    FOREIGN KEY (`Trail_idTrail`)
    REFERENCES `sampling`.`Trail` (`idTrail`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Observation_ImprodAct1`
    FOREIGN KEY (`Activity_idActivity`)
    REFERENCES `sampling`.`Activity` (`idActivity`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Observation_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `sampling`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Observation_Worker1`
    FOREIGN KEY (`Worker_idWorker`)
    REFERENCES `sampling`.`Worker` (`idWorker`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sampling`.`Sampling_has_User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sampling`.`Sampling_has_User` (
  `Sampling_idSampling` INT(11) NOT NULL,
  `User_idUser` INT(11) NOT NULL,
  `isAdmin` BIT(1) NOT NULL,
  PRIMARY KEY (`Sampling_idSampling`, `User_idUser`),
  INDEX `fk_Sampling_has_User_User1_idx` (`User_idUser` ASC),
  INDEX `fk_Sampling_has_User_Sampling1_idx` (`Sampling_idSampling` ASC),
  CONSTRAINT `fk_Sampling_has_User_Sampling1`
    FOREIGN KEY (`Sampling_idSampling`)
    REFERENCES `sampling`.`Sampling` (`idSampling`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Sampling_has_User_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `sampling`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sampling`.`Schedule`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sampling`.`Schedule` (
  `idSchedule` INT(11) NOT NULL,
  `initial_hour` TIME NULL DEFAULT NULL,
  `final_hour` TIME NULL DEFAULT NULL,
  `Sampling_idSampling` INT(11) NOT NULL,
  `day_number` INT(11) NULL DEFAULT NULL COMMENT 'Numero del dia en que se hace el recorrido\nej: dia 1\n',
  PRIMARY KEY (`idSchedule`, `Sampling_idSampling`),
  INDEX `fk_Sampling_idSampling_idx` (`Sampling_idSampling` ASC),
  CONSTRAINT `fk_Sampling_idSampling`
    FOREIGN KEY (`Sampling_idSampling`)
    REFERENCES `sampling`.`Sampling` (`idSampling`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;
USE `sampling` ;

-- -----------------------------------------------------
-- procedure authUser
-- -----------------------------------------------------

DELIMITER $$
USE `sampling`$$
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
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure createBasicSampling
-- -----------------------------------------------------

DELIMITER $$
USE `sampling`$$
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
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure getActivities
-- -----------------------------------------------------

DELIMITER $$
USE `sampling`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getActivities`()
BEGIN
	select name, description, type from Activity;
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure getDefParam
-- -----------------------------------------------------

DELIMITER $$
USE `sampling`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getDefParam`(pId_Sampling int, pDescription VARCHAR(255),pIdSamplingType int)
BEGIN
 SELECT p_definitive, q_definitive, error_definitive, n_definitive,z_definitive
 from Sampling
 WHERE idSampling = pId_Sampling and description = pDescription and SamplingType_idSamplingType = pIdSamplingType ;
 END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure getPreparam
-- -----------------------------------------------------

DELIMITER $$
USE `sampling`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getPreparam`(pId_Sampling int, pDescription VARCHAR(255),pIdSamplingType int)
BEGIN
 SELECT p_preliminar, q_preliminar, n_preliminar
 from Sampling
 WHERE idSampling = pId_Sampling and description = pDescription and SamplingType_idSamplingType = pIdSamplingType ;
 END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure getSamplingId
-- -----------------------------------------------------

DELIMITER $$
USE `sampling`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getSamplingId`(pName VARCHAR(8))
BEGIN
 SELECT idSampling
 from Sampling
 WHERE name = pName;
 END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure getSamplingName
-- -----------------------------------------------------

DELIMITER $$
USE `sampling`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getSamplingName`()
BEGIN
 SELECT name
 from Sampling
 ORDER BY idSampling;
 END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure pInsert_Group
-- -----------------------------------------------------

DELIMITER $$
USE `sampling`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pInsert_Group`(IN pname varchar(45), IN pid_sampling INT)
BEGIN
    insert into `Group` (name, Sampling_idSampling)
    values (pname, pid_sampling);
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure pInsert_Sampling
-- -----------------------------------------------------

DELIMITER $$
USE `sampling`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pInsert_Sampling`(IN pdescription varchar(255),IN pname varchar(8),IN pidsampling_type int)
BEGIN
    insert into Sampling(description,
						name,
						SamplingType_idsamplingType,
                        live,
						isPreliminarSampling)
    values (pdescription,pname,pidsampling_type, 1, 1);
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure pInsert_Schedule
-- -----------------------------------------------------

DELIMITER $$
USE `sampling`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pInsert_Schedule`(IN pinitial_hour TIME, IN pfinal_hour TIME, IN pid_sampling INT)
BEGIN
    insert into Schedule (initial_hour,final_hour, Sampling_idSampling)
    values (pinitial_hour,pfinal_hour,pid_sampling);
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure pInsert_Trail
-- -----------------------------------------------------

DELIMITER $$
USE `sampling`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pInsert_Trail`(IN phour time, IN pday_number int, IN pid_sampling int)
BEGIN
    insert into Trail (hour, day_number, Sampling_idSampling)
    values (phour, pday_number, pid_sampling);
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure pUpDefParamsSampling
-- -----------------------------------------------------

DELIMITER $$
USE `sampling`$$
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
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure pUpPreParamsSampling
-- -----------------------------------------------------

DELIMITER $$
USE `sampling`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pUpPreParamsSampling`(pId_Sampling int, pDescription varchar(255),
	pIdSamplingType int,
	pp_preliminar double,
	pq_preliminar double,
	perror_preliminar double,
	pn_preliminar int,
	pz_preliminar double)
BEGIN
	UPDATE Sampling
    SET
		p_preliminar = pp_preliminar,
		q_preliminar = pq_preliminar,
		n_preliminar = pn_preliminar
	WHERE idSampling = pId_Sampling AND description = pDescription AND SamplingType_idSamplingType =  pIdSamplingType;
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure pUpdate_DefSampling
-- -----------------------------------------------------

DELIMITER $$
USE `sampling`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pUpdate_DefSampling`(IN pId_Sampling int,
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
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure pUpdate_PreSampling
-- -----------------------------------------------------

DELIMITER $$
USE `sampling`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pUpdate_PreSampling`(IN pId_Sampling int, 	pestimatedTrailTime int,
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
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure pUpdate_Sampling
-- -----------------------------------------------------

DELIMITER $$
USE `sampling`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pUpdate_Sampling`(IN pId_Sampling int, 	pestimatedTrailTime int,
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
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure pUpdate_SamplingPreParams
-- -----------------------------------------------------

DELIMITER $$
USE `sampling`$$
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
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure getIdSampDescIdSampType
-- -----------------------------------------------------

DELIMITER $$
CREATE PROCEDURE getIdSampDescIdSampType(pName varchar(8))
BEGIN
SELECT idSampling, description, SamplingType_idSamplingType
from Sampling
WHERE name = pName;
END $$
DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure getColaborators
-- -----------------------------------------------------

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getColaborators`(
	in pNameSampling varchar(255)
)
BEGIN
	select u.cedula as cedula, concat(u.name, ' ', u.lastname) as name, su.isAdmin as admin
	from Sampling_has_User su
		join User u on su.User_idUser = u.idUser
		join Sampling s on s.idSampling = su.Sampling_idSampling
	where s.name = pNameSampling;
END $$
SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
