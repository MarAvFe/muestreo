DELIMITER //
CREATE PROCEDURE pUpdate_DefSampling (IN pId_Sampling int,
	pp_def double,
	pq_def double,
	perror_def double,
	pn_def int,
	pz_def double,
	pabs_precision_def double,
	prelative_precision_def double)
BEGIN
	UPDATE Sampling 
    SET isPreliminarSampling = 0,
		p_definitive = pp_def,
		q_definitive = pq_def,
		error_definitive = perror_def,
		n_definitive = pn_def,
		z_definitive = pz_def,
		abs_precision_definitive = pabs_precision_def,
		relative_precision_definitive = prelative_precision_def
	WHERE idSampling = pId_Sampling;
END //
DELIMITER 