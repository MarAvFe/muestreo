-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema muestreo
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema muestreo
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `muestreo` DEFAULT CHARACTER SET utf8 ;
USE `muestreo` ;

-- -----------------------------------------------------
-- Table `muestreo`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `muestreo`.`User` (
  `idUser` INT(11) NOT NULL AUTO_INCREMENT,
  `cedula` VARCHAR(12) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(12) NOT NULL,
  `pwd` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idUser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `muestreo`.`Comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `muestreo`.`Comments` (
  `idComments` INT(11) NOT NULL AUTO_INCREMENT,
  `comment` VARCHAR(500) NOT NULL,
  `date` DATE NOT NULL,
  `User_idUser` INT(11) NOT NULL,
  PRIMARY KEY (`idComments`),
  INDEX `fk_Comments_User1_idx` (`User_idUser` ASC),
  CONSTRAINT `fk_Comments_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `muestreo`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `muestreo`.`Distraction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `muestreo`.`Distraction` (
  `idDistraction` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `ownResponsible` BIT(1) NOT NULL,
  PRIMARY KEY (`idDistraction`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `muestreo`.`Group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `muestreo`.`Group` (
  `idGroup` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idGroup`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `muestreo`.`Trail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `muestreo`.`Trail` (
  `idTrail` INT(11) NOT NULL AUTO_INCREMENT COMMENT '			',
  `hour` TIME NULL DEFAULT NULL,
  PRIMARY KEY (`idTrail`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `muestreo`.`Group_has_Trail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `muestreo`.`Group_has_Trail` (
  `Group_idGroup` INT(11) NOT NULL,
  `Trail_idTrail` INT(11) NOT NULL,
  PRIMARY KEY (`Group_idGroup`, `Trail_idTrail`),
  INDEX `fk_Group_has_Trail_Trail1_idx` (`Trail_idTrail` ASC),
  INDEX `fk_Group_has_Trail_Group1_idx` (`Group_idGroup` ASC),
  CONSTRAINT `fk_Group_has_Trail_Group1`
    FOREIGN KEY (`Group_idGroup`)
    REFERENCES `muestreo`.`Group` (`idGroup`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Group_has_Trail_Trail1`
    FOREIGN KEY (`Trail_idTrail`)
    REFERENCES `muestreo`.`Trail` (`idTrail`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `muestreo`.`Worker`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `muestreo`.`Worker` (
  `idWorker` INT(11) NOT NULL AUTO_INCREMENT COMMENT '	',
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `position` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idWorker`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `muestreo`.`Observation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `muestreo`.`Observation` (
  `idObservation` INT(11) NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `hasData` BIT(1) NOT NULL,
  `isProductive` BIT(1) NULL DEFAULT NULL,
  `isCancelled` BIT(1) NULL DEFAULT NULL,
  `idDistraction` INT(11) NULL DEFAULT NULL,
  `Distraction_idDistraction` INT(11) NULL DEFAULT NULL,
  `Worker_idWorker` INT(11) NULL DEFAULT NULL,
  `User_idUser` INT(11) NOT NULL,
  PRIMARY KEY (`idObservation`, `User_idUser`),
  INDEX `fk_Observation_Distraction1_idx` (`Distraction_idDistraction` ASC),
  INDEX `fk_Observation_Worker1_idx` (`Worker_idWorker` ASC),
  INDEX `fk_Observation_User1_idx` (`User_idUser` ASC),
  CONSTRAINT `fk_Observation_Distraction1`
    FOREIGN KEY (`Distraction_idDistraction`)
    REFERENCES `muestreo`.`Distraction` (`idDistraction`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Observation_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `muestreo`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Observation_Worker1`
    FOREIGN KEY (`Worker_idWorker`)
    REFERENCES `muestreo`.`Worker` (`idWorker`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `muestreo`.`SamplingType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `muestreo`.`SamplingType` (
  `idSamplingType` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `initials` VARCHAR(4) NOT NULL,
  PRIMARY KEY (`idSamplingType`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `muestreo`.`Sampling`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `muestreo`.`Sampling` (
  `idSampling` INT(11) NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(255) NOT NULL,
  `live` BIT(1) NOT NULL,
  `estimatedObservations` INT(11) NULL DEFAULT NULL,
  `calculatedObservations` INT(11) NULL DEFAULT NULL,
  `improductivityGrade` TINYINT(4) NULL DEFAULT NULL,
  `name` VARCHAR(8) NOT NULL,
  `SamplingType_idSamplingType` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idSampling`),
  INDEX `fk_Sampling_SamplingType1_idx` (`SamplingType_idSamplingType` ASC),
  CONSTRAINT `fk_Sampling_SamplingType1`
    FOREIGN KEY (`SamplingType_idSamplingType`)
    REFERENCES `muestreo`.`SamplingType` (`idSamplingType`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `muestreo`.`Sampling_has_Group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `muestreo`.`Sampling_has_Group` (
  `Sampling_idSampling` INT(11) NOT NULL,
  `Group_idGroup` INT(11) NOT NULL,
  PRIMARY KEY (`Sampling_idSampling`, `Group_idGroup`),
  INDEX `fk_Sampling_has_Group_Group1_idx` (`Group_idGroup` ASC),
  INDEX `fk_Sampling_has_Group_Sampling1_idx` (`Sampling_idSampling` ASC),
  CONSTRAINT `fk_Sampling_has_Group_Group1`
    FOREIGN KEY (`Group_idGroup`)
    REFERENCES `muestreo`.`Group` (`idGroup`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Sampling_has_Group_Sampling1`
    FOREIGN KEY (`Sampling_idSampling`)
    REFERENCES `muestreo`.`Sampling` (`idSampling`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `muestreo`.`Trail_has_Observation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `muestreo`.`Trail_has_Observation` (
  `Trail_idTrail` INT(11) NOT NULL,
  `Observation_idObservation` INT(11) NOT NULL,
  PRIMARY KEY (`Trail_idTrail`, `Observation_idObservation`),
  INDEX `fk_Trail_has_Observation_Observation1_idx` (`Observation_idObservation` ASC),
  INDEX `fk_Trail_has_Observation_Trail1_idx` (`Trail_idTrail` ASC),
  CONSTRAINT `fk_Trail_has_Observation_Observation1`
    FOREIGN KEY (`Observation_idObservation`)
    REFERENCES `muestreo`.`Observation` (`idObservation`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Trail_has_Observation_Trail1`
    FOREIGN KEY (`Trail_idTrail`)
    REFERENCES `muestreo`.`Trail` (`idTrail`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
