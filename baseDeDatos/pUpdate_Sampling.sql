DELIMITER //
CREATE PROCEDURE pUpdate_PreSampling (IN pId_Sampling int, 	pestimatedTrailTime int,
	pp_preliminar double,
	pq_preliminar double,
	perror_preliminar double,
	pn_preliminar int,
	pz_preliminar double,
	pabs_precision_preliminar double,
	prelative_precision_preliminar double)
BEGIN
	UPDATE Sampling 
    SET estimatedTrailTime = pestimatedTrailTime,
		p_preliminar = pp_preliminar,
		q_preliminar = pq_preliminar,
		error_preliminar = perror_preliminar,
		n_preliminar = pn_preliminar,
		z_preliminar = pz_preliminar,
		abs_precision_preliminar = pabs_precision_preliminar,
		relative_precision_preliminar = prelative_precision_preliminar
	WHERE idSampling = pId_Sampling;
END //
DELIMITER 

	