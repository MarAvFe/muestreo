DELIMITER //
CREATE PROCEDURE pInsert_Group (IN pname varchar(45), IN pid_sampling INT)
BEGIN
    insert into `Group` (name, Sampling_idSampling) 
    values (pname, pid_sampling);
END //
DELIMITER ;