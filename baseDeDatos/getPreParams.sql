
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getPreparam`(pId_Sampling int, pDescription VARCHAR(255),pIdSamplingType int)
 BEGIN
 SELECT p_preliminar, q_preliminar, error_preliminar, n_preliminar,z_preliminar 
 from sampling
 WHERE idSampling = pId_Sampling and description = pDescription and SamplingType_idSamplingType = pIdSamplingType ;
 END //
DELIMITER ;


