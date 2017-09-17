DELIMITER //
CREATE PROCEDURE pInsert_Schedule (IN pinitial_hour TIME, IN pfinal_hour TIME, IN pid_sampling INT)

BEGIN
    insert into Schedule (initial_hour,final_hour, Sampling_idSampling) 
    values (pinitial_hour,pfinal_hour,pid_sampling);
END //
DELIMITER ;
