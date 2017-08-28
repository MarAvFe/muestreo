-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

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
-- Table `sampling`.`SamplingType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sampling`.`SamplingType` (
  `idSamplingType` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `initials` VARCHAR(4) NOT NULL,
  PRIMARY KEY (`idSamplingType`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sampling`.`Sampling`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sampling`.`Sampling` (
  `idSampling` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(255) NOT NULL,
  `live` BIT NOT NULL,
  `estimatedObservations` INT NULL,
  `calculatedObservations` INT NULL,
  `improductivityGrade` TINYINT NULL,
  `name` VARCHAR(8) NOT NULL,
  `SamplingType_idSamplingType` INT NULL,
  PRIMARY KEY (`idSampling`),
  INDEX `fk_Sampling_SamplingType1_idx` (`SamplingType_idSamplingType` ASC),
  CONSTRAINT `fk_Sampling_SamplingType1`
    FOREIGN KEY (`SamplingType_idSamplingType`)
    REFERENCES `sampling`.`SamplingType` (`idSamplingType`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sampling`.`Group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sampling`.`Group` (
  `idGroup` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idGroup`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sampling`.`Sampling_has_Group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sampling`.`Sampling_has_Group` (
  `Sampling_idSampling` INT NOT NULL,
  `Group_idGroup` INT NOT NULL,
  PRIMARY KEY (`Sampling_idSampling`, `Group_idGroup`),
  INDEX `fk_Sampling_has_Group_Group1_idx` (`Group_idGroup` ASC),
  INDEX `fk_Sampling_has_Group_Sampling1_idx` (`Sampling_idSampling` ASC),
  CONSTRAINT `fk_Sampling_has_Group_Sampling1`
    FOREIGN KEY (`Sampling_idSampling`)
    REFERENCES `sampling`.`Sampling` (`idSampling`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Sampling_has_Group_Group1`
    FOREIGN KEY (`Group_idGroup`)
    REFERENCES `sampling`.`Group` (`idGroup`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sampling`.`Trail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sampling`.`Trail` (
  `idTrail` INT NOT NULL AUTO_INCREMENT COMMENT '			',
  `hour` TIME NULL,
  PRIMARY KEY (`idTrail`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sampling`.`Group_has_Trail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sampling`.`Group_has_Trail` (
  `Group_idGroup` INT NOT NULL,
  `Trail_idTrail` INT NOT NULL,
  PRIMARY KEY (`Group_idGroup`, `Trail_idTrail`),
  INDEX `fk_Group_has_Trail_Trail1_idx` (`Trail_idTrail` ASC),
  INDEX `fk_Group_has_Trail_Group1_idx` (`Group_idGroup` ASC),
  CONSTRAINT `fk_Group_has_Trail_Group1`
    FOREIGN KEY (`Group_idGroup`)
    REFERENCES `sampling`.`Group` (`idGroup`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Group_has_Trail_Trail1`
    FOREIGN KEY (`Trail_idTrail`)
    REFERENCES `sampling`.`Trail` (`idTrail`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sampling`.`ImprodAct`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sampling`.`ImprodAct` (
  `idImprodact` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `isCollaborative` BIT NULL,
  PRIMARY KEY (`idImprodact`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sampling`.`Worker`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sampling`.`Worker` (
  `idWorker` INT NOT NULL AUTO_INCREMENT COMMENT '	',
  `name` VARCHAR(45) NULL,
  `position` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  PRIMARY KEY (`idWorker`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sampling`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sampling`.`User` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `cedula` VARCHAR(12) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(12) NOT NULL,
  `pwd` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idUser`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sampling`.`Observation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sampling`.`Observation` (
  `idObservation` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `hasData` BIT NOT NULL,
  `isProductive` BIT NULL,
  `isCancelled` BIT NULL,
  `ImprodAct_idImprodAct` INT NULL,
  `Worker_idWorker` INT NULL,
  `User_idUser` INT NOT NULL,
  PRIMARY KEY (`idObservation`, `User_idUser`),
  INDEX `fk_Observation_Distraction1_idx` (`ImprodAct_idImprodAct` ASC),
  INDEX `fk_Observation_Worker1_idx` (`Worker_idWorker` ASC),
  INDEX `fk_Observation_User1_idx` (`User_idUser` ASC),
  CONSTRAINT `fk_Observation_ImprodAct1`
    FOREIGN KEY (`ImprodAct_idImprodAct`)
    REFERENCES `sampling`.`ImprodAct` (`idImprodact`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Observation_Worker1`
    FOREIGN KEY (`Worker_idWorker`)
    REFERENCES `sampling`.`Worker` (`idWorker`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Observation_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `sampling`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sampling`.`Trail_has_Observation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sampling`.`Trail_has_Observation` (
  `Trail_idTrail` INT NOT NULL,
  `Observation_idObservation` INT NOT NULL,
  PRIMARY KEY (`Trail_idTrail`, `Observation_idObservation`),
  INDEX `fk_Trail_has_Observation_Observation1_idx` (`Observation_idObservation` ASC),
  INDEX `fk_Trail_has_Observation_Trail1_idx` (`Trail_idTrail` ASC),
  CONSTRAINT `fk_Trail_has_Observation_Trail1`
    FOREIGN KEY (`Trail_idTrail`)
    REFERENCES `sampling`.`Trail` (`idTrail`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Trail_has_Observation_Observation1`
    FOREIGN KEY (`Observation_idObservation`)
    REFERENCES `sampling`.`Observation` (`idObservation`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sampling`.`Comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sampling`.`Comments` (
  `idComments` INT NOT NULL AUTO_INCREMENT,
  `comment` VARCHAR(500) NOT NULL,
  `date` DATE NOT NULL,
  `User_idUser` INT NOT NULL,
  PRIMARY KEY (`idComments`, `User_idUser`),
  INDEX `fk_Comments_User1_idx` (`User_idUser` ASC),
  CONSTRAINT `fk_Comments_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `sampling`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sampling`.`Sampling_has_Comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sampling`.`Sampling_has_Comments` (
  `Sampling_idSampling` INT NOT NULL,
  `Comments_idComments` INT NOT NULL,
  `Comments_User_idUser` INT NOT NULL,
  PRIMARY KEY (`Sampling_idSampling`, `Comments_idComments`, `Comments_User_idUser`),
  INDEX `fk_Sampling_has_Comments_Comments1_idx` (`Comments_idComments` ASC, `Comments_User_idUser` ASC),
  INDEX `fk_Sampling_has_Comments_Sampling1_idx` (`Sampling_idSampling` ASC),
  CONSTRAINT `fk_Sampling_has_Comments_Sampling1`
    FOREIGN KEY (`Sampling_idSampling`)
    REFERENCES `sampling`.`Sampling` (`idSampling`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Sampling_has_Comments_Comments1`
    FOREIGN KEY (`Comments_idComments` , `Comments_User_idUser`)
    REFERENCES `sampling`.`Comments` (`idComments` , `User_idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sampling`.`User_has_Sampling`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sampling`.`User_has_Sampling` (
  `User_idUser` INT NOT NULL,
  `Sampling_idSampling` INT NOT NULL,
  `isOwner` BIT NOT NULL,
  PRIMARY KEY (`User_idUser`, `Sampling_idSampling`),
  INDEX `fk_User_has_Sampling_Sampling1_idx` (`Sampling_idSampling` ASC),
  INDEX `fk_User_has_Sampling_User1_idx` (`User_idUser` ASC),
  CONSTRAINT `fk_User_has_Sampling_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `sampling`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_Sampling_Sampling1`
    FOREIGN KEY (`Sampling_idSampling`)
    REFERENCES `sampling`.`Sampling` (`idSampling`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
