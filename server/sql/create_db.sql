DROP DATABASE IF EXISTS AI_Exam_Web_App_DB;
CREATE DATABASE AI_Exam_Web_App_DB;
USE AI_Exam_Web_App_DB;

-- Users
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `firstname` varchar(100) DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  `password_hash` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
);

-- Sample user for testing purposes
INSERT INTO `users` (`username`, `email`, `firstname`, `lastname`, `password_hash`, `created_at`, `last_login`)
VALUES ('user', 'example@mail.com', 'user', 'mcUser', 'password', NOW(), NOW());


-- Quizzes, depends on Users
CREATE TABLE `quizzes` (
  `quiz_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` longtext,
  PRIMARY KEY (`quiz_id`),
  KEY `fk_quiz_user_idx` (`user_id`),
  CONSTRAINT `fk_quiz_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Questions, depends on Quizzes
CREATE TABLE `questions` (
  `question_id` int NOT NULL AUTO_INCREMENT,
  `quiz_id` int DEFAULT NULL,
  `text` longtext,
  PRIMARY KEY (`question_id`),
  KEY `fk_quiz_id_idx` (`quiz_id`),
  CONSTRAINT `fk_question_quiz_id` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`quiz_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Answers, depends on Questions
CREATE TABLE `answers` (
  `answer_id` int NOT NULL AUTO_INCREMENT,
  `question_id` int DEFAULT NULL,
  `text` longtext,
  `is_correct` tinyint DEFAULT NULL,
  PRIMARY KEY (`answer_id`),
  KEY `fk_question_id_idx` (`question_id`),
  CONSTRAINT `fk_answer_question_id` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- PDFs, depends on Users
CREATE TABLE `pdfs` (
  `PDF_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `upload_time` datetime DEFAULT NULL,
  PRIMARY KEY (`PDF_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `fk_PDFs_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
);

-- Quiz Attempts, depends on Users and Quizzes
CREATE TABLE `user_quiz_attempts` (
  `attempt_id` int NOT NULL AUTO_INCREMENT,
  `quiz_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `score` int DEFAULT NULL,
  `attempt_time` datetime DEFAULT NULL,
  PRIMARY KEY (`attempt_id`),
  KEY `fk_quiz_id_idx` (`quiz_id`),
  KEY `fk_user_id_idx` (`user_id`),
  CONSTRAINT `fk_attempt_quiz_id` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`quiz_id`),
  CONSTRAINT `fk_attempt_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
);

/*
INSERT INTO `Answers` VALUES (1,1,'Fulfillment, Procurement, Production',1),(2,1,'Human Capital Management, Asset Management',0),(3,1,'Supply Chain Management, Product Lifecycle Management',0),(4,1,'Demand-to-Order Process, Idea-to-Market Process',0),(5,2,'Fulfillment Process',1),(6,2,'Production Process',0),(7,2,'Procurement Process',0),(8,2,'Asset Management Process',0),(9,3,'Fulfillment Process',0),(10,3,'Production Process',1),(11,3,'Procurement Process',0),(12,3,'Asset Management Process',0),(13,4,'Supply Chain Management',0),(14,4,'Human Capital Management',1),(15,4,'Product Lifecycle Management',0),(16,4,'Customer Relationship Management',0),(17,5,'Plan-to-Produce Process in SCM',1),(18,5,'Source-to-Settle Process in SRM',0),(19,5,'Idea-to-Market Process in PLM',0),(20,5,'Demand-to-Order Process in CRM',0),(21,6,'Define & Understand Enterprise Systems',0),(22,6,'Illustrate the flows in business processes',0),(23,6,'Understand the types of data in enterprise systems',0),(24,6,'All of the above',1),(25,7,'Execute the process',0),(26,7,'Inform and provide data',0),(27,7,'Automation embedded in the process',0),(28,7,'All of the above',1),(29,8,'Increased lead times',0),(30,8,'Excess inventory',0),(31,8,'Lack of visibility across the process',0),(32,8,'All of the above',1),(33,9,'Vendor side: SAP, Oracle, Odoo OS',0),(34,9,'Customer side',0),(35,9,'Third-party side: Consultant',0),(36,9,'All of the above',1),(37,10,'To create an invoice',0),(38,10,'To fill a customer order',1),(39,10,'To receive payment',0),(40,10,'To monitor the process',0),(41,11,'High volume, low-cost products',0),(42,11,'Base model + options',1),(43,11,'Entry-level products',0),(44,11,'Low-cost accessories',0),(45,12,'Customer Invoice',1),(46,12,'Quotation',0),(47,12,'Picking Document',0),(48,12,'Customer Purchase Order',0),(49,13,'To capture and store process data',1),(50,13,'To create sales orders manually',0),(51,13,'To monitor payment receiving',0),(52,13,'To prepare shipments physically',0),(53,14,'Human Resources, Finance, Marketing',0),(54,14,'Supply Chain Management, Customer Relationship Management, Knowledge Management Systems',1),(55,14,'Social Media Networking, Email Management, Data Analysis',0),(56,14,'Sales, Advertising, Production',0),(57,15,'Information about competitors',0),(58,15,'Structure of the enterprise, including companies, divisions, physical facilities, and functional areas',1),(59,15,'Stock market trends',0),(60,15,'External partnerships',0),(61,16,'Real-time transactional data',0),(62,16,'Critical data points for decision-making',0),(63,16,'Key entities in an organization like customers, vendors, products, and employees',1),(64,16,'Financial forecasting data',0),(65,17,'Cost-effective without any support services',1),(66,17,'Proprietary hardware requirement',0),(67,17,'Lengthy implementation process',0),(68,17,'Vendor lock-in',0),(69,18,'Hardware, Software, Networking',0),(70,18,'User Interface, Natural Language Understanding, Integration',1),(71,18,'Operating System, Software Development Kit, Cloud Computing',0),(72,18,'Machine Learning, Agile Development, Deployment tools',0);

INSERT INTO `Questions` VALUES (1,1,'What are the key concepts and assumptions discussed in the Integrated Processes section?'),(2,1,'Which process involves reviewing the inventory of finished goods as an initial step?'),(3,1,'Which process involves reviewing the inventory of raw materials as an initial step?'),(4,1,'What is the main focus of Intra-Company Processes?'),(5,1,'Which process falls under the Extended (Inter-Company) Processes category?'),(6,2,'What are the learning objectives mentioned in the text?'),(7,2,'What is the role of Enterprise Systems in organizations?'),(8,2,'What are the consequences of delays in processes mentioned in the text?'),(9,2,'What career opportunities are mentioned in Enterprise Systems?'),(10,3,'What is the purpose of the basic fulfillment process?'),(11,3,'Which type of products are typically associated with \'configure-to-order\'?'),(12,3,'What document is typically created after a Sales Order in the fulfillment process?'),(13,3,'What is the role of Enterprise Systems in the fulfillment process?'),(14,4,'What are the types of Enterprise Systems mentioned in the text?'),(15,4,'What does Organizational Data in ES define?'),(16,4,'What type of data does Master Data in ES define?'),(17,4,'What is the main advantage of Open-Source ERP Systems compared to Closed-Source vendors?'),(18,4,'What are the essential components of a Chatbot according to the text?');

INSERT INTO `Quizzes` VALUES (1,9,'8-Intergrated Process (CH06).pdf',NULL),(2,9,'1-Organizations, BP and IS (CH01) (1).pdf',NULL),(3,1,'6-Fulfillment Process (CH04) (1).pdf',NULL),(4,3,'2-Enterprise Systems, OSS, Conversational System (CH02).pdf',NULL);
*/
INSERT INTO `Users` VALUES (1,'adam123','adam@gmail.com','adam','adamsson','hejsansvejsan','2024-04-15 12:22:45','2024-04-20 10:47:52'),(2,'jeppe','jepser@gmail.com','jesper','pillaren','hejsan','2024-04-15 15:13:56','2024-04-19 14:42:19'),(3,'henke','henke@ravnborg.se','henrik','ravnborg','hej','2024-04-15 15:19:34','2024-05-03 14:52:55'),(4,'henkan','henkan@ravnborg.se','henrik','ravnborg','hej','2024-04-15 15:20:33','2024-04-15 15:20:33'),(5,'hank','henken@ravnborg.se','henrik','ravnborg','hej','2024-04-15 15:22:02','2024-04-15 15:22:31'),(6,'nilsan','nils@gmail.com','nils','fri','hej','2024-04-15 15:23:16','2024-04-19 16:01:00'),(7,'matfri','matias@nånting.se','mati','fri','hejsan','2024-04-15 15:25:06','2024-04-15 15:25:06'),(8,'matfri2','matiaaas@nånting.se','mati','fri','hejsan','2024-04-15 15:25:48','2024-04-15 15:25:48'),(9,'lunden','johan@lund.se','johan','lund','hej','2024-04-15 15:30:07','2024-05-03 10:52:37'),(10,'nils','nils@tjena.com','nilsfri','nilsen','hej','2024-04-15 16:12:22','2024-04-15 16:12:22'),(11,'anders','anders@gmail.com','anders','hejsan','hej','2024-04-15 16:55:43','2024-04-15 16:59:38');



SHOW TABLES;
