
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getSamplingName`()
BEGIN
 SELECT name 
 from sampling
 ORDER BY idSampling;
 END //
 DELIMITER ;