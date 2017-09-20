DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `getDefParam`(pId_Sampling int, pDescription VARCHAR(255),pIdSamplingType int)
BEGIN
 SELECT p_definitive, q_definitive, error_definitive, n_definitive,z_definitive
 from sampling
 WHERE idSampling = pId_Sampling and description = pDescription and SamplingType_idSamplingType = pIdSamplingType ;
 END //
 DELIMITER ;
 
 
 
 