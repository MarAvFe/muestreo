
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `pUpdate_SamplingPreParams`(pId_Sampling int, pDescription varchar(255),
	piIdSamplingType int,
    pq_preliminar double,
	pq_preliminar double,
	perror_preliminar double,
	pn_preliminar int,
	pz_preliminar double)
BEGIN
	UPDATE Sampling 
    SET samplingp_preliminar = pp_preliminar,
		q_preliminar = pq_preliminar,
		error_preliminar = perror_preliminar,
		n_preliminar = pn_preliminar,
		z_preliminar = pz_preliminar,
	WHERE idSampling = pId_Sampling and description = pDescription and SamplingType_idSamplingType ;
END
DELIMITER ;