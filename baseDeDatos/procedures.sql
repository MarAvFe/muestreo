DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getImprodActs`()
BEGIN
	select name, description, isCollaborative from ImprodAct;
END$$
DELIMITER ;
