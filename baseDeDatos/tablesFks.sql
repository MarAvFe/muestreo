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
  `name` VARCHAR(8) NOT NULL,
  `SamplingType_idSamplingType` INT NOT NULL,
  `estimatedTrailTime_Minutes` INT NULL,
  `isPreliminarSampling` BIT NULL,
  `p_preliminar` DOUBLE NULL,
  `q_preliminar` DOUBLE NULL,
  `error_preliminar` DOUBLE NULL,
  `n_preliminar` INT NULL,
  `z_preliminar` DOUBLE NULL,
  `p_definitive` DOUBLE NULL,
  `q_definitive` DOUBLE NULL,
  `error_definitive` DOUBLE NULL,
  `n_definitive` INT NULL,
  `z_definitive` DOUBLE NULL,
  `abs_precision_preliminar` DOUBLE NULL,
  `abs_precision_definitive` DOUBLE NULL,
  `relative_precision_preliminar` DOUBLE NULL,
  `relative_precision_definitive` DOUBLE NULL,
  PRIMARY KEY (`idSampling`, `SamplingType_idSamplingType`),
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
  `Sampling_idSampling` INT NOT NULL,
  PRIMARY KEY (`idGroup`, `Sampling_idSampling`),
  INDEX `Sampling_idSampling_idGroup_fk_idx` (`Sampling_idSampling` ASC),
  CONSTRAINT `Sampling_idSampling_idGroup_fk`
    FOREIGN KEY (`Sampling_idSampling`)
    REFERENCES `sampling`.`Sampling` (`idSampling`)
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
  `Sampling_idSampling` INT NOT NULL,
  PRIMARY KEY (`idTrail`, `Sampling_idSampling`),
  INDEX `Sampling_idSampling_Trail_fk_idx` (`Sampling_idSampling` ASC),
  CONSTRAINT `Sampling_idSampling_Trail_fk`
    FOREIGN KEY (`Sampling_idSampling`)
    REFERENCES `sampling`.`Sampling` (`idSampling`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
  `Group_idGroup` INT NOT NULL,
  PRIMARY KEY (`idWorker`, `Group_idGroup`),
  INDEX `fk_Group_idGroup_idx` (`Group_idGroup` ASC),
  CONSTRAINT `fk_Group_idGroup`
    FOREIGN KEY (`Group_idGroup`)
    REFERENCES `sampling`.`Group` (`idGroup`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
-- Table `sampling`.`Activity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sampling`.`Activity` (
  `idActivity` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `type` TINYINT NOT NULL,
  PRIMARY KEY (`idActivity`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sampling`.`Observation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sampling`.`Observation` (
  `idObservation` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `hasData` BIT NOT NULL,
  `isProductive` BIT NOT NULL,
  `isCancelled` BIT NOT NULL,
  `Worker_idWorker` INT NOT NULL,
  `User_idUser` INT NOT NULL,
  `Trail_idTrail` INT NOT NULL,
  `Activity_idActivity` INT NOT NULL,
  PRIMARY KEY (`idObservation`, `User_idUser`, `Activity_idActivity`, `Trail_idTrail`, `Worker_idWorker`),
  INDEX `fk_Observation_Worker1_idx` (`Worker_idWorker` ASC),
  INDEX `fk_Observation_User1_idx` (`User_idUser` ASC),
  INDEX `fk_Observation_IdTrail_idx` (`Trail_idTrail` ASC),
  INDEX `fk_Observation_ImprodAct1_idx` (`Activity_idActivity` ASC),
  CONSTRAINT `fk_Observation_Worker1`
    FOREIGN KEY (`Worker_idWorker`)
    REFERENCES `sampling`.`Worker` (`idWorker`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Observation_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `sampling`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
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
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sampling`.`Comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sampling`.`Comment` (
  `idComment` INT NOT NULL AUTO_INCREMENT,
  `comment` VARCHAR(500) NOT NULL,
  `date` DATE NOT NULL,
  `User_idUser` INT NOT NULL,
  `isNotification` BIT NOT NULL,
  `Sampling_idSampling` INT NULL,
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
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sampling`.`Schedule`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sampling`.`Schedule` (
  `idSchedule` INT NOT NULL,
  `initial_hour` TIME NULL,
  `final_hour` TIME NULL,
  `Sampling_idSampling` INT NOT NULL,
  `day_number` INT NULL COMMENT 'Numero del dia en que se hace el recorrido\nej: dia 1\n',
  PRIMARY KEY (`idSchedule`, `Sampling_idSampling`),
  INDEX `fk_Sampling_idSampling_idx` (`Sampling_idSampling` ASC),
  CONSTRAINT `fk_Sampling_idSampling`
    FOREIGN KEY (`Sampling_idSampling`)
    REFERENCES `sampling`.`Sampling` (`idSampling`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sampling`.`Sampling_has_User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sampling`.`Sampling_has_User` (
  `Sampling_idSampling` INT NOT NULL,
  `User_idUser` INT NOT NULL,
  `isAdmin` BIT NOT NULL,
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
ENGINE = InnoDB;

SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
