CREATE DEFINER=`root`@`localhost` TRIGGER `entry_BEFORE_INSERT` BEFORE INSERT ON `entry` FOR EACH ROW BEGIN
SET NEW.ENTRY_date = NOW();
END

CREATE DEFINER=`root`@`localhost` TRIGGER `ticket_BEFORE_INSERT` BEFORE INSERT ON `ticket` FOR EACH ROW BEGIN
	SET NEW.time_purchased = NOW();
END