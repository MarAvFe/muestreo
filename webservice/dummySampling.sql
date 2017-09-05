-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema dummySampling
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `dummySampling` ;

-- -----------------------------------------------------
-- Schema dummySampling
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dummySampling` DEFAULT CHARACTER SET latin1 ;
USE `dummySampling` ;

-- -----------------------------------------------------
-- Table `dummySampling`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dummySampling`.`user` (
  `iduser` INT(11) NOT NULL AUTO_INCREMENT COMMENT '	',
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `lastname` VARCHAR(45) NULL DEFAULT NULL,
  `born` DATE NULL DEFAULT NULL,
  `experience` INT(11) NULL DEFAULT NULL,
  `lefty` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`iduser`))
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = latin1;

USE `dummySampling` ;

-- -----------------------------------------------------
-- Placeholder table for view `dummySampling`.`vSimplePerson`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dummySampling`.`vSimplePerson` (`iduser` INT, `name` INT, `born` INT, `experience` INT, `lefty` INT);

-- -----------------------------------------------------
-- procedure pInsertUser
-- -----------------------------------------------------

DELIMITER $$
USE `dummySampling`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pInsertUser`(
	in pName varchar(45),
    in pLastname varchar(45),
	in pBorn date,
	in pExperience int,
	in pLefty bit
)
BEGIN
	INSERT INTO `dummySampling`.`user` (`name`,`lastname`,`born`,`experience`,`lefty`)
    VALUES(pName, pLastname, pBorn, pExperience, pLefty);

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure pSelectPersons
-- -----------------------------------------------------

DELIMITER $$
USE `dummySampling`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pSelectPersons`()
BEGIN
	SELECT * FROM `dummySampling`.`vSimplePerson`;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- View `dummySampling`.`vSimplePerson`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dummySampling`.`vSimplePerson`;
USE `dummySampling`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `dummySampling`.`vSimplePerson` AS select `dummySampling`.`user`.`iduser` AS `iduser`,`dummySampling`.`user`.`name` AS `name`,`dummySampling`.`user`.`born` AS `born`,`dummySampling`.`user`.`experience` AS `experience`,`dummySampling`.`user`.`lefty` AS `lefty` from `dummySampling`.`user`;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (6,'Michael','Mena','1997-03-06',9,'1'),(7,'Andrea','Ramirez','1987-08-07',56,'1'),(8,'Camila','Álvarez','1957-03-08',19,'0'),(9,'Roberto','Zumbado','2007-05-09',2,'0'),(10,'Luis Carlos','Contreras','1996-02-11',4,'1'),(11,'Cristina','Chavarría','1992-02-01',14,'1');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (6,'Michael','Mena','1997-03-06',9,'1'),(7,'Andrea','Ramirez','1987-08-07',56,'1'),(8,'Camila','Álvarez','1957-03-08',19,'0'),(9,'Roberto','Zumbado','2007-05-09',2,'0'),(10,'Luis Carlos','Contreras','1996-02-11',4,'1'),(11,'Cristina','Chavarría','1992-02-01',14,'1');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
