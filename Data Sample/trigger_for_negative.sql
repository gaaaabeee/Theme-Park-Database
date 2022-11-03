CREATE DEFINER=`root`@`localhost` TRIGGER `customer_BEFORE_UPDATE` BEFORE UPDATE ON `customer` FOR EACH ROW BEGIN
IF (new.height < 0.0) THEN
	SET new.height = 0.0;
    END IF;
END

CREATE DEFINER=`root`@`localhost` TRIGGER `customer_BEFORE_INSERT` BEFORE INSERT ON `customer` FOR EACH ROW BEGIN
	IF (new.height < 0.0) THEN
	SET new.height = 0.0;
    END IF;
END

-- this trigger activates before update and insert to stop negative value for height
