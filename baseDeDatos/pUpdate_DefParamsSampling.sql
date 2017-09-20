DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `pUpDefParamsSampling`(pId_Sampling int, pDescription varchar(255),
	pIdSamplingType int,
	pp_defitive double,
	pq_definitive double,
	perror_definitive double,
	pn_definitive int,
	pz_definitive double)
BEGIN
	UPDATE sampling 
    SET 
		p_definitive = pp_definitive,
		q_definitive = pq_definitive,
		error_definitive = perror_definitive,
		n_definitive = pn_definitive,
		z_definitive = pz_definitive
	WHERE idSampling = pId_Sampling AND description = pDescription AND SamplingType_idSamplingType =  pIdSamplingType;
END //
DELIMITER ;