CREATE TABLE `user_notes` (
  `iduser_notes` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `notes` text,
  `is_archive` tinyint DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`iduser_notes`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;