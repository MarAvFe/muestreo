-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
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
DROP TABLE IF EXISTS `sampling`.`Activity` ;

SHOW WARNINGS;
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
DROP TABLE IF EXISTS `sampling`.`User` ;

SHOW WARNINGS;
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
-- Table `sampling`.`SampledProfile`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sampling`.`SampledProfile` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `sampling`.`SampledProfile` (
  `idSampledProfile` INT(11) NOT NULL AUTO_INCREMENT COMMENT '	',
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`idSampledProfile`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sampling`.`SamplingType`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sampling`.`SamplingType` ;

SHOW WARNINGS;
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
DROP TABLE IF EXISTS `sampling`.`Sampling` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `sampling`.`Sampling` (
  `idSampling` INT(11) NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(1000) NOT NULL,
  `live` BIT(1) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
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
  `SampledProfile_idSampledProfile` INT(11) NOT NULL,
  PRIMARY KEY (`idSampling`, `SamplingType_idSamplingType`),
  INDEX `fk_Sampling_SamplingType1_idx` (`SamplingType_idSamplingType` ASC),
  INDEX `fk_Sampling_SampledProfile1_idx` (`SampledProfile_idSampledProfile` ASC),
  CONSTRAINT `fk_Sampling_SampledProfile1`
    FOREIGN KEY (`SampledProfile_idSampledProfile`)
    REFERENCES `sampling`.`SampledProfile` (`idSampledProfile`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
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
DROP TABLE IF EXISTS `sampling`.`Comment` ;

SHOW WARNINGS;
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
-- Table `sampling`.`Trail`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sampling`.`Trail` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `sampling`.`Trail` (
  `idTrail` INT(11) NOT NULL AUTO_INCREMENT COMMENT '			',
  `hour` TIME NOT NULL,
  `Sampling_idSampling` INT(11) NOT NULL,
  `User_idUser` INT(11) NOT NULL,
  PRIMARY KEY (`idTrail`, `Sampling_idSampling`, `User_idUser`),
  INDEX `Sampling_idSampling_Trail_fk_idx` (`Sampling_idSampling` ASC),
  INDEX `fk_Trail_User1_idx` (`User_idUser` ASC),
  CONSTRAINT `Sampling_idSampling_Trail_fk`
    FOREIGN KEY (`Sampling_idSampling`)
    REFERENCES `sampling`.`Sampling` (`idSampling`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Trail_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `sampling`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sampling`.`Observation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sampling`.`Observation` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `sampling`.`Observation` (
  `idObservation` INT(11) NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `hasData` BIT(1) NOT NULL,
  `isProductive` BIT(1) NOT NULL,
  `isCancelled` BIT(1) NOT NULL,
  `Trail_idTrail` INT(11) NOT NULL,
  `Activity_idActivity` INT(11) NOT NULL,
  PRIMARY KEY (`idObservation`, `Activity_idActivity`, `Trail_idTrail`),
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
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sampling`.`Sampling_has_User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sampling`.`Sampling_has_User` ;

SHOW WARNINGS;
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
DROP TABLE IF EXISTS `sampling`.`Schedule` ;

SHOW WARNINGS;
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

USE `sampling`;
DROP procedure IF EXISTS `sampling`.`authUser`;
SHOW WARNINGS;

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

USE `sampling`;
DROP procedure IF EXISTS `sampling`.`createBasicSampling`;
SHOW WARNINGS;

DELIMITER $$
USE `sampling`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `createBasicSampling`(
	in pDescription varchar(1000),
	in pName varchar(255),
	in pLive bit,
	in pSamplingType_idSamplingType int,
	in pSampleProfileName varchar(45),
	in pSampleProfileDescription varchar(255)
)
BEGIN
	INSERT INTO `sampling`.`SampledProfile`(`name`,`description`)VALUES
    (pSampleProfileName,pSampleProfileDescription);

	select idSampledProfile into @pNew
    from SampledProfile
    where name = pSampleProfileName and description = pSampleProfileDescription
    limit 1;

	INSERT INTO `sampling`.`Sampling`(`description`,`live`,`name`,`SamplingType_idSamplingType`,`SampledProfile_idSampledProfile`)VALUES
    (pDescription, pLive, pName, pSamplingType_idSamplingType, @pNew);
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure getActivities
-- -----------------------------------------------------

USE `sampling`;
DROP procedure IF EXISTS `sampling`.`getActivities`;
SHOW WARNINGS;

DELIMITER $$
USE `sampling`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getActivities`()
BEGIN
	select name, description, type from Activity;
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure getColaborators
-- -----------------------------------------------------

USE `sampling`;
DROP procedure IF EXISTS `sampling`.`getColaborators`;
SHOW WARNINGS;

DELIMITER $$
USE `sampling`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getColaborators`(
	in pNameSampling varchar(255)
)
BEGIN
	select u.cedula as cedula, concat(u.name, ' ', u.lastname) as name, su.isAdmin as admin
	from Sampling_has_User su
		join User u on su.User_idUser = u.idUser
		join Sampling s on s.idSampling = su.Sampling_idSampling
	where s.name = pNameSampling;
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure getDefParam
-- -----------------------------------------------------

USE `sampling`;
DROP procedure IF EXISTS `sampling`.`getDefParam`;
SHOW WARNINGS;

DELIMITER $$
USE `sampling`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getDefParam`(pId_Sampling int, pDescription VARCHAR(1000),pIdSamplingType int)
BEGIN
 SELECT p_definitive, q_definitive, error_definitive, n_definitive,z_definitive
 from Sampling
 WHERE idSampling = pId_Sampling and description = pDescription and SamplingType_idSamplingType = pIdSamplingType ;
 END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure getIdSampDescIdSampType
-- -----------------------------------------------------

USE `sampling`;
DROP procedure IF EXISTS `sampling`.`getIdSampDescIdSampType`;
SHOW WARNINGS;

DELIMITER $$
USE `sampling`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getIdSampDescIdSampType`(pName varchar(255))
BEGIN
SELECT idSampling, description, SamplingType_idSamplingType
from Sampling
WHERE name = pName;
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure getPreparam
-- -----------------------------------------------------

USE `sampling`;
DROP procedure IF EXISTS `sampling`.`getPreparam`;
SHOW WARNINGS;

DELIMITER $$
USE `sampling`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getPreparam`(pId_Sampling int, pDescription VARCHAR(1000),pIdSamplingType int)
BEGIN
 SELECT p_preliminar, q_preliminar, n_preliminar
 from Sampling
 WHERE idSampling = pId_Sampling and description = pDescription and SamplingType_idSamplingType = pIdSamplingType ;
 END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure getParticipatingSamplings
-- -----------------------------------------------------

USE `sampling`;
DROP procedure IF EXISTS `sampling`.`getParticipatingSamplings`;
SHOW WARNINGS;

DELIMITER $$
USE `sampling`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getParticipatingSamplings`(pIdUser int(11))
BEGIN
 SELECT idSampling, name
 from Sampling s
	join Sampling_has_User su on s.idSampling = su.Sampling_idSampling
 WHERE su.User_idUser = pIdUser;
 END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure getSamplingId
-- -----------------------------------------------------

USE `sampling`;
DROP procedure IF EXISTS `sampling`.`getSamplingId`;
SHOW WARNINGS;

DELIMITER $$
USE `sampling`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getSamplingId`(pName VARCHAR(255))
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

USE `sampling`;
DROP procedure IF EXISTS `sampling`.`getSamplingName`;
SHOW WARNINGS;

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

USE `sampling`;
DROP procedure IF EXISTS `sampling`.`pInsert_Group`;
SHOW WARNINGS;

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

USE `sampling`;
DROP procedure IF EXISTS `sampling`.`pInsert_Sampling`;
SHOW WARNINGS;

DELIMITER $$
USE `sampling`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pInsert_Sampling`(IN pdescription varchar(1000),IN pname varchar(255),IN pidsampling_type int)
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

USE `sampling`;
DROP procedure IF EXISTS `sampling`.`pInsert_Schedule`;
SHOW WARNINGS;

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

USE `sampling`;
DROP procedure IF EXISTS `sampling`.`pInsert_Trail`;
SHOW WARNINGS;

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

USE `sampling`;
DROP procedure IF EXISTS `sampling`.`pUpDefParamsSampling`;
SHOW WARNINGS;

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

USE `sampling`;
DROP procedure IF EXISTS `sampling`.`pUpPreParamsSampling`;
SHOW WARNINGS;

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

USE `sampling`;
DROP procedure IF EXISTS `sampling`.`pUpdate_DefSampling`;
SHOW WARNINGS;

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

USE `sampling`;
DROP procedure IF EXISTS `sampling`.`pUpdate_PreSampling`;
SHOW WARNINGS;

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

USE `sampling`;
DROP procedure IF EXISTS `sampling`.`pUpdate_Sampling`;
SHOW WARNINGS;

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
-- procedure pInsertTrail
-- -----------------------------------------------------

USE `sampling`;
DROP procedure IF EXISTS `sampling`.`pInsertTrail`;
SHOW WARNINGS;

DELIMITER $$
USE `sampling`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pInsertTrail`(
    pHour datetime,
    pIdSampling int(11),
    pIdUser int
)
BEGIN
    INSERT INTO `sampling`.`Trail`(`hour`,`Sampling_idSampling`,`User_idUser`)VALUES
    (pHour, pIdSampling, pIdUser);
 END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure pUpdate_SamplingPreParams
-- -----------------------------------------------------

USE `sampling`;
DROP procedure IF EXISTS `sampling`.`pUpdate_SamplingPreParams`;
SHOW WARNINGS;

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
-- procedure pInsert_Report
-- -----------------------------------------------------
USE `sampling`;
DROP procedure IF EXISTS `sampling`.`pInsert_Report`;
SHOW WARNINGS;

DELIMITER $$
USE `sampling`$$
create DEFINER=`root`@`localhost` procedure `pInsert_Report`(IN pIdUser int, pComment varchar(500))
BEGIN
    insert into `Comment` (comment, date, User_idUser, isNotification)
    values (pComment, CURDATE(), pIdUser, 0);
END$$
DELIMITER ;
SHOW WARNINGS;


-- -----------------------------------------------------
-- procedure pGet_UserId
-- -----------------------------------------------------
USE `sampling`;
DROP procedure IF EXISTS `sampling`.`pGet_UserId`;
SHOW WARNINGS;

DELIMITER $$
USE `sampling`$$
create DEFINER=`root`@`localhost` procedure `pGet_UserId`(IN pCedula varchar(255))
BEGIN
    SELECT idUser
    From User
    WHERE cedula= pCedula;
END $$
DELIMITER ;
SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
