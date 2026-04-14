-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: customer_app_db
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `app_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `app_type` varchar(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `data_json` json DEFAULT NULL,
  `submitted_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`app_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (1,1,'Personal Loan','approved','{\"amount\": \"2000\", \"details\": \"Entry-level card for daily expenses; applicant has 1 year of work experience.\"}','2026-04-13 02:36:31'),(2,1,'Personal Loan','pending','{\"amount\": \"5000\", \"details\": \"Medical expenses; repayment term 24 months.\"}','2026-04-13 02:36:31'),(3,1,'Auto Loan','pending','{\"amount\": \"18000\", \"details\": \"Used car purchase; 5-year term.\"}','2026-04-13 02:36:31'),(4,1,'Mortgage','pending','{\"amount\": \"120000\", \"details\": \"First home purchase; 20% down payment.\"}','2026-04-13 02:36:31'),(5,1,'Business Loan','pending','{\"amount\": \"50000\", \"details\": \"Startup capital for small café.\"}','2026-04-13 02:36:31'),(6,1,'Credit Card','pending','{\"amount\": \"3500\", \"details\": \"Balance transfer request; good credit score.\"}','2026-04-13 02:36:31'),(7,1,'Personal Loan','pending','{\"amount\": \"10000\", \"details\": \"Home renovation; 36-month repayment.\"}','2026-04-13 02:36:31'),(8,1,'Auto Loan','pending','{\"amount\": \"25000\", \"details\": \"New car financing; stable income.\"}','2026-04-13 02:36:31'),(9,1,'Mortgage','pending','{\"amount\": \"200000\", \"details\": \"Condo purchase; dual-income applicants.\"}','2026-04-13 02:36:31'),(10,1,'Business Loan','pending','{\"amount\": \"75000\", \"details\": \"Inventory expansion for retail store.\"}','2026-04-13 02:36:31'),(11,1,'Credit Card','pending','{\"amount\": \"1500\", \"details\": \"Student applicant; part-time income.\"}','2026-04-13 02:36:31'),(12,1,'Personal Loan','pending','{\"amount\": \"7500\", \"details\": \"Debt consolidation.\"}','2026-04-13 02:36:31'),(13,1,'Auto Loan','pending','{\"amount\": \"30000\", \"details\": \"SUV purchase; 6-year term.\"}','2026-04-13 02:36:31'),(14,1,'Mortgage','pending','{\"amount\": \"350000\", \"details\": \"Family home upgrade.\"}','2026-04-13 02:36:31'),(15,1,'Business Loan','pending','{\"amount\": \"120000\", \"details\": \"Equipment purchase for manufacturing.\"}','2026-04-13 02:36:31'),(16,1,'Credit Card','pending','{\"amount\": \"4000\", \"details\": \"Travel rewards card request.\"}','2026-04-13 02:36:31'),(17,1,'Personal Loan','pending','{\"amount\": \"3000\", \"details\": \"Emergency fund coverage.\"}','2026-04-13 02:36:31'),(18,1,'Auto Loan','pending','{\"amount\": \"12000\", \"details\": \"Motorcycle financing.\"}','2026-04-13 02:36:31'),(19,1,'Mortgage','pending','{\"amount\": \"90000\", \"details\": \"Rural property purchase.\"}','2026-04-13 02:36:31'),(20,1,'Business Loan','pending','{\"amount\": \"40000\", \"details\": \"Online business expansion.\"}','2026-04-13 02:36:31'),(21,1,'Credit Card','pending','{\"amount\": \"6000\", \"details\": \"High-limit card for frequent traveler.\"}','2026-04-13 02:36:31'),(22,1,'Personal Loan','pending','{\"amount\": \"15000\", \"details\": \"Wedding expenses.\"}','2026-04-13 02:36:31'),(23,1,'Auto Loan','pending','{\"amount\": \"22000\", \"details\": \"Sedan purchase; 4-year term.\"}','2026-04-13 02:36:31'),(24,1,'Mortgage','pending','{\"amount\": \"500000\", \"details\": \"Investment property.\"}','2026-04-13 02:36:31'),(25,1,'Business Loan','pending','{\"amount\": \"200000\", \"details\": \"Franchise purchase.\"}','2026-04-13 02:36:31'),(26,1,'Credit Card','pending','{\"amount\": \"2500\", \"details\": \"Cashback card application.\"}','2026-04-13 02:36:31'),(27,1,'Personal Loan','pending','{\"amount\": \"8000\", \"details\": \"Medical procedure financing.\"}','2026-04-13 02:36:31'),(28,1,'Auto Loan','pending','{\"amount\": \"28000\", \"details\": \"Electric vehicle purchase.\"}','2026-04-13 02:36:31'),(29,1,'Mortgage','pending','{\"amount\": \"275000\", \"details\": \"Townhouse acquisition.\"}','2026-04-13 02:36:31'),(30,1,'Business Loan','pending','{\"amount\": \"60000\", \"details\": \"Marketing campaign funding.\"}','2026-04-13 02:36:31'),(31,1,'Credit Card','pending','{\"amount\": \"7500\", \"details\": \"Premium card request.\"}','2026-04-13 02:36:31'),(32,1,'Personal Loan','pending','{\"amount\": \"20000\", \"details\": \"Education expenses.\"}','2026-04-13 02:36:31'),(33,1,'Auto Loan','pending','{\"amount\": \"16000\", \"details\": \"Compact car purchase.\"}','2026-04-13 02:36:31'),(34,1,'Mortgage','pending','{\"amount\": \"180000\", \"details\": \"First-time buyer program.\"}','2026-04-13 02:36:31'),(35,1,'Business Loan','pending','{\"amount\": \"90000\", \"details\": \"Restaurant renovation.\"}','2026-04-13 02:36:31'),(36,1,'Credit Card','pending','{\"amount\": \"1000\", \"details\": \"Secured card application.\"}','2026-04-13 02:36:31'),(37,1,'Personal Loan','pending','{\"amount\": \"12000\", \"details\": \"Home improvement.\"}','2026-04-13 02:36:31'),(38,1,'Auto Loan','pending','{\"amount\": \"35000\", \"details\": \"Luxury car financing.\"}','2026-04-13 02:36:31'),(39,1,'Mortgage','pending','{\"amount\": \"600000\", \"details\": \"High-value property purchase.\"}','2026-04-13 02:36:31'),(40,1,'Business Loan','pending','{\"amount\": \"300000\", \"details\": \"Large-scale expansion.\"}','2026-04-13 02:36:31'),(41,1,'Credit Card','pending','{\"amount\": \"5500\", \"details\": \"Business credit card.\"}','2026-04-13 02:36:31'),(42,1,'Personal Loan','pending','{\"amount\": \"6500\", \"details\": \"Moving expenses.\"}','2026-04-13 02:36:31'),(43,1,'Auto Loan','pending','{\"amount\": \"14000\", \"details\": \"Used car replacement.\"}','2026-04-13 02:36:31'),(44,1,'Mortgage','pending','{\"amount\": \"220000\", \"details\": \"Suburban home purchase.\"}','2026-04-13 02:36:31'),(45,1,'Business Loan','pending','{\"amount\": \"110000\", \"details\": \"Warehouse lease and setup.\"}','2026-04-13 02:36:31'),(46,1,'Credit Card','pending','{\"amount\": \"8000\", \"details\": \"High-income applicant.\"}','2026-04-13 02:36:31'),(47,1,'Personal Loan','pending','{\"amount\": \"9000\", \"details\": \"Travel and relocation.\"}','2026-04-13 02:36:31'),(48,1,'Auto Loan','pending','{\"amount\": \"40000\", \"details\": \"Pickup truck purchase.\"}','2026-04-13 02:36:31'),(49,1,'Mortgage','pending','{\"amount\": \"750000\", \"details\": \"Luxury home financing.\"}','2026-04-13 02:36:31'),(50,1,'Business Loan','pending','{\"amount\": \"500000\", \"details\": \"Tech startup funding.\"}','2026-04-13 02:36:31');
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-14 11:25:49
