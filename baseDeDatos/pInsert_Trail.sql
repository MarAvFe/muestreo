DELIMITER //
CREATE PROCEDURE pInsert_Trail (IN phour time, IN pday_number int, IN pid_sampling int)
BEGIN
    insert into Trail (hour, day_number, Sampling_idSampling) 
    values (phour, pday_number, pid_sampling);
END //
DELIMITER ;