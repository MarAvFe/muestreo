DELIMITER //
CREATE PROCEDURE pInsert_Sampling (IN pdescription varchar(255),IN pname varchar(8),IN pidsampling_type int)

BEGIN
    insert into Sampling(description,
						name,
						SamplingType_idsamplingType,
                        live,
						isPreliminarSampling) 
                        
    values (pdescription,pname,pidsampling_type, 1, 1);
END //
DELIMITER ;