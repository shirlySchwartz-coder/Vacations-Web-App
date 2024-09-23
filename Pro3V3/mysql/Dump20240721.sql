CREATE DATABASE  IF NOT EXISTS `tagging_vacation` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tagging_vacation`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: tagging_vacation
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `folowers`
--

DROP TABLE IF EXISTS `folowers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `folowers` (
  `userId` int NOT NULL,
  `vacationId` int NOT NULL,
  PRIMARY KEY (`userId`,`vacationId`),
  KEY `userId_idx` (`userId`),
  KEY `vacationId_idx` (`vacationId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  CONSTRAINT `vacationId` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `folowers`
--

LOCK TABLES `folowers` WRITE;
/*!40000 ALTER TABLE `folowers` DISABLE KEYS */;
INSERT INTO `folowers` VALUES (1,2),(1,3),(2,1),(2,8),(3,9),(4,2),(4,5),(5,1);
/*!40000 ALTER TABLE `folowers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `userFirstName` varchar(45) DEFAULT NULL,
  `userLastName` varchar(45) DEFAULT NULL,
  `userEmail` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `isAdmin` tinyint DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userId_UNIQUE` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'shirly','schwartz','shirly@gmail.com','12345',1),(2,'meir','banai','meir@gmail.com','12345',0),(3,'dana','berger','dana@gmail.com','12345',0),(4,'yoval','banai','yoval@gmail.com','12345',0),(5,'dany','litani','dany@gmail.com','12345',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `vacationId` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(45) DEFAULT NULL,
  `info` varchar(600) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `price` int DEFAULT NULL,
  `pictureUrl` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`vacationId`),
  UNIQUE KEY `vacationId_UNIQUE` (`vacationId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (1,'Pariz','An organized trip that also includes a flight to Paris allows an interesting glimpse of all the cultural abundance that the city has to offer.','2024-07-21','2024-07-28',1500,NULL),(2,'London, United Kingdom','London’s a sprawling city at the center of everything: art, history, culture—you name it. But what sets it apart from other major hubs are its distinct neighborhoods, each with their own vibe. Spend an afternoon with the fam in Kensington: It’s got museums, parks, and plenty of other kid-approved things to do. Or check out edgy Shoreditch for cool shops and street murals (perfect for photo ops), then head to Soho where you can grab a pint at a pub or hit a club and party ‘til dawn','2024-06-21','2024-06-28',3000,NULL),(3,'Thailand','The lush jungles of Thailand promise adventure, while the serene beaches are the perfect place to splash in the sun. The Similan Islands feature some of the best dive sites in the world, where barracuda dart amid coral reefs and rock formations. Party in the nightclubs of Patong or linger over mango sticky rice at the famous Bangkok family restaurant Kao Neoo Korpanich','2024-08-21','2024-08-28',4000,NULL),(4,'India','From the beaches of sun-soaked Goa to the frenetic bazaars of Mumbai, India offers wealth of vastly different, yet equally enthralling, experiences. Explore the sparkling lakes and palaces of Udaipur, watch traditional Indian dance in Kochi, or buy brilliantly-colored silk saris at a market in Varanasi… no matter how much you travel in India, you’ll always find more to discover in this vibrant, fascinating country.','2024-09-20','2024-09-27',3600,NULL),(5,'Nepal','The near otherworldly Himalayan kingdom of Nepal can trace its history back to the 7th century and the arrival of Kirati sheepherders. Today, misty temples perch on rugged ridges, monasteries peer over deep valleys, faded by centuries, and Kathmandu\'s Old City brims with ancient Buddhist temples and ornate palaces.','2024-09-20','2024-09-26',6000,NULL),(6,'Israel','From the Tel Aviv beach scene to the shores of the Dead Sea, Israel layers diverse cultures, outdoor adventures, and religious heritage onto a desert backdrop. Exploring here means history at every turn, while a humming food scene treats gourmet travelers to ultra-fresh flavors.','2024-09-22','2024-09-30',6000,NULL),(7,'Iceland','Icecaps and glaciers, spouting geysers and steaming solfataras, volcanoes, raging rivers and magnificent waterfalls, clusters of puffins and razorbills, and cavorting whales just offshore—it\'s all just another day in Iceland. This country\'s many geological wonders have brought a tourism boom, with most first-time visitors driving the Golden Circle Route through the southwest.','2024-10-15','2024-10-25',10000,NULL),(8,'Lapland, Finland','The northern most part of Finland, Lapland, is the magical arctic region full of contrasts. In fact, contrasts are a key factor in the allure of Lapland where 24-hour sunlight in the summer replaces the dark winter days filled with Northern Lights. Every season in Finnish Lapland is uniquely different from each other. The inhabitants of the region say that Lapland actually has 8 seasons instead of 4. In the wintertime, Lapland is as close as reality gets to those who dream of a winter wonderland. Spring brings along light that follows the long season of ‘kaamos’ (arctic night in Finnish)','2024-11-15','2024-11-25',15000,NULL),(9,'New York City','The tallest skyscrapers, the biggest museums, the cheesiest pizza. New York City takes everything to the max. It’s easy to see why it’s the most-visited place in the U.S.: Whether you want to check out historic landmarks, catch a Broadway show, or stroll the streets of Brooklyn, there’s no wrong way to do it—and something new to discover every time you go.','2024-12-15','2024-12-30',7600,NULL),(10,'Maldives','With 26 atolls and 1,000+ islands spread out across the idyllic waters of the Indian Ocean, the Maldives are an island-hopper’s dream. Below the water, there’s miles of coral reef that are home to thousands of species of marine life and underwater treasures. To get the best of it: Go diving at Broken Rock, snorkel with manta rays in Hanifaru Bay, or charter a boat to hit all the top spots. ','2024-09-15','2024-09-30',6800,NULL),(11,'Monaco','The Principality of Monaco, a small city-state overlooking the pristine blue waters of the Mediterranean, is a place famed for its glamour and wealth. The Palais Princier, former home of Princess Grace and current home of her son, Prince Albert II, is at the top of the cliff-bound medieval Monaco-Ville. More well known is Monte Carlo, a neighborhood soaked in sun, money, and expensive champagne, and home to the Formula One Monaco Grand Prix, the European Poker Tour, and the Monte Carlo Rally.','2024-11-16','2024-11-30',6999,NULL),(12,'Rome, Italy','It’s easy to see why Rome’s one of the most-visited places on the planet: There’s history everywhere (the Pantheon, the Colosseum, the list goes on), sculptural masterpieces in almost every piazza, and—of course—ridiculously good food. Every trip could feel like a whirlwind, but slow down and you’ll discover lots of surprises. Spend a Sunday morning in Trastevere and hunt for vintage finds at Porta Portese flea market.','2024-12-01','2024-12-15',4999,NULL);
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-21 15:44:54
