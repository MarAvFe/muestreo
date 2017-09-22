
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getSamplingId`(pName VARCHAR(8))
BEGIN
 SELECT idSampling
 from sampling
 WHERE name = pName;
 END //
 DELIMITER ;