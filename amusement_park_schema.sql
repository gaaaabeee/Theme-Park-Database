CREATE DATABASE  IF NOT EXISTS `amusement_park` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `amusement_park`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: amusement_park
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `assigned_to`
--

DROP TABLE IF EXISTS `assigned_to`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assigned_to` (
  `asigned_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `attraction_id` int NOT NULL,
  PRIMARY KEY (`asigned_id`),
  KEY `Employee_ref_idx` (`employee_id`),
  KEY `Attraction_ref_idx` (`attraction_id`),
  CONSTRAINT `Attraction_ref_assigned` FOREIGN KEY (`attraction_id`) REFERENCES `attraction` (`attraction_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Employee_ref` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assigned_to`
--

LOCK TABLES `assigned_to` WRITE;
/*!40000 ALTER TABLE `assigned_to` DISABLE KEYS */;
/*!40000 ALTER TABLE `assigned_to` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attraction`
--

DROP TABLE IF EXISTS `attraction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attraction` (
  `attraction_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `location` int DEFAULT NULL,
  `min_height` varchar(450) NOT NULL DEFAULT '0',
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `breakdown_nums` int DEFAULT NULL,
  `revenue` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`attraction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attraction`
--

LOCK TABLES `attraction` WRITE;
/*!40000 ALTER TABLE `attraction` DISABLE KEYS */;
/*!40000 ALTER TABLE `attraction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(45) DEFAULT NULL,
  `lname` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `height` varchar(45) DEFAULT NULL,
  `DOB` varchar(45) DEFAULT NULL,
  `tickets_bought` int DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `date`
--

DROP TABLE IF EXISTS `date`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `date` (
  `date` datetime NOT NULL,
  `open` binary(1) DEFAULT NULL,
  `holiday` binary(1) DEFAULT NULL,
  `rainy_date` binary(1) DEFAULT NULL,
  `total_revenue` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `date`
--

LOCK TABLES `date` WRITE;
/*!40000 ALTER TABLE `date` DISABLE KEYS */;
/*!40000 ALTER TABLE `date` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `employee_id` int NOT NULL,
  `fname` varchar(45) DEFAULT NULL,
  `lname` varchar(45) DEFAULT NULL,
  `DOB` datetime DEFAULT NULL,
  `supervisor_id` int DEFAULT NULL,
  `job_title` varchar(45) DEFAULT NULL,
  `assigned_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  KEY `supervisor_idx` (`supervisor_id`),
  CONSTRAINT `supervisor` FOREIGN KEY (`supervisor_id`) REFERENCES `employee` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entry`
--

DROP TABLE IF EXISTS `entry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entry` (
  `entry_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `ticket_id` int NOT NULL,
  `entry_date` datetime DEFAULT NULL,
  PRIMARY KEY (`entry_id`),
  KEY `ENTRY\_idx` (`customer_id`),
  KEY `ticket_id_idx` (`ticket_id`),
  CONSTRAINT `customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ticket_id` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`ticket_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entry`
--

LOCK TABLES `entry` WRITE;
/*!40000 ALTER TABLE `entry` DISABLE KEYS */;
/*!40000 ALTER TABLE `entry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `item_price` decimal(10,0) DEFAULT NULL,
  `item_name` varchar(45) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ride_breakdown`
--

DROP TABLE IF EXISTS `ride_breakdown`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ride_breakdown` (
  `breakdown_id` int NOT NULL AUTO_INCREMENT,
  `ride_id` int DEFAULT NULL,
  `maintainer_id` int DEFAULT NULL,
  `breakdown_date` datetime DEFAULT NULL,
  `breakdown_desc` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`breakdown_id`),
  KEY `ride_ref_idx` (`ride_id`),
  CONSTRAINT `ride_ref` FOREIGN KEY (`ride_id`) REFERENCES `attraction` (`attraction_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ride_breakdown`
--

LOCK TABLES `ride_breakdown` WRITE;
/*!40000 ALTER TABLE `ride_breakdown` DISABLE KEYS */;
/*!40000 ALTER TABLE `ride_breakdown` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sold_at`
--

DROP TABLE IF EXISTS `sold_at`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sold_at` (
  `sold_id` int NOT NULL AUTO_INCREMENT,
  `item_id` int DEFAULT NULL,
  `attraction_id` int DEFAULT NULL,
  PRIMARY KEY (`sold_id`),
  KEY `item_idx` (`item_id`),
  KEY `attraction_ref_idx` (`attraction_id`),
  CONSTRAINT `attraction_ref_sold_at` FOREIGN KEY (`attraction_id`) REFERENCES `attraction` (`attraction_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `item_ref` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sold_at`
--

LOCK TABLES `sold_at` WRITE;
/*!40000 ALTER TABLE `sold_at` DISABLE KEYS */;
/*!40000 ALTER TABLE `sold_at` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket` (
  `ticket_id` int NOT NULL AUTO_INCREMENT,
  `time_purchased` datetime DEFAULT NULL,
  `ticket_name` varchar(45) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `online_ticket` binary(1) DEFAULT NULL,
  PRIMARY KEY (`ticket_id`),
  KEY `customer_id_idx` (`customer_id`),
  CONSTRAINT `TICKET` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usage_per_day`
--

DROP TABLE IF EXISTS `usage_per_day`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usage_per_day` (
  `usage_id` int NOT NULL,
  `attraction_id` int DEFAULT NULL,
  `date_id` datetime DEFAULT NULL,
  PRIMARY KEY (`usage_id`),
  KEY `attraction_red_idx` (`attraction_id`),
  KEY `date_ref` (`date_id`),
  CONSTRAINT `attraction_ref_usage` FOREIGN KEY (`attraction_id`) REFERENCES `attraction` (`attraction_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `date_ref` FOREIGN KEY (`date_id`) REFERENCES `date` (`date`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usage_per_day`
--

LOCK TABLES `usage_per_day` WRITE;
/*!40000 ALTER TABLE `usage_per_day` DISABLE KEYS */;
/*!40000 ALTER TABLE `usage_per_day` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'amusement_park'
--

--
-- Dumping routines for database 'amusement_park'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-19 18:58:20
