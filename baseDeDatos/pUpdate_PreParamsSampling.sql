DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `pUpPreParamsSampling`(pId_Sampling int, pDescription varchar(255),
	pIdSamplingType int,
	pp_preliminar double,
	pq_preliminar double,
	perror_preliminar double,
	pn_preliminar int,
	pz_preliminar double)
BEGIN
	UPDATE sampling 
    SET 
		p_preliminar = pp_preliminar,
		q_preliminar = pq_preliminar,
		error_preliminar = perror_preliminar,
		n_preliminar = pn_preliminar,
		z_preliminar = pz_preliminar
	WHERE idSampling = pId_Sampling AND description = pDescription AND SamplingType_idSamplingType =  pIdSamplingType;
END//
DELIMITER ;
