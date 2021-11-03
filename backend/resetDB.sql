CREATE DATABASE IF NOT EXISTS `db`;

USE `db`;

DROP TABLE IF EXISTS `sessions`;
DROP TABLE IF EXISTS `trainerSkills`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `trainers`;
DROP TABLE IF EXISTS `profiles`;
DROP TABLE IF EXISTS `userTypes`;
DROP TABLE IF EXISTS `workouts`;

/*
 * Table of available workouts at the gym
 */
CREATE TABLE `workouts` (
	`workoutID`		int				NOT NULL AUTO_INCREMENT,
	`workout`		varchar(50)		UNIQUE NOT NULL,
	`description`	varchar(500)	NOT NULL,
	PRIMARY KEY(`workoutID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*
 * Table of user types
 */
CREATE TABLE `userTypes` (
	`userType`		int				NOT NULL AUTO_INCREMENT,
	`description`	varchar(500)	NOT NULL,
	PRIMARY KEY(`userType`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `userTypes` (`description`) VALUES ("user");
INSERT INTO `userTypes` (`description`) VALUES ("trainer");
INSERT INTO `userTypes` (`description`) VALUES ("admin");

/*
 * Table of generic profiles
 */
CREATE TABLE `profiles` (
	`profileID`		int				NOT NULL AUTO_INCREMENT,
	`username`		varchar(50)		UNIQUE NOT NULL,
	`password`		varchar(100)		NOT NULL,
	`firstName`		varchar(50)		DEFAULT NULL,
	`lastName`		varchar(50)		DEFAULT NULL,
	`age`			int				DEFAULT NULL,
	`gender`		varchar(50)		DEFAULT NULL,
	`phone`			varchar(50)		UNIQUE DEFAULT NULL,
	`email`			varchar(50) 	UNIQUE DEFAULT NULL,
	`pfp`			varchar(50)		DEFAULT NULL,
	`description`	varchar(500)	DEFAULT NULL,
	`userType`		int				NOT NULL,
	PRIMARY KEY(`profileID`),
	KEY `userType` (`userType`),
	CONSTRAINT `profiles_ibfk_1` FOREIGN KEY (`userType`) REFERENCES `userTypes` (`userType`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `profiles` (`username`, `password`, `firstName`, `lastName`, `age`, `gender`, `phone`, `email`, `userType`) VALUES ("exampleUser", "examplePassword", "exampleFirst", "exampleLast", 1, "male", "exampleUserPhone", "exampleUserEmail", 1);
INSERT INTO `profiles` (`username`, `password`, `firstName`, `lastName`, `age`, `gender`, `phone`, `email`, `userType`) VALUES ("exampleTrainer", "examplePassword", "exampleFirst", "exampleLast", 1, "male", "exampleTrainerPhone", "exampleTrainerEmail", 2);
INSERT INTO `profiles` (`username`, `password`, `firstName`, `lastName`, `age`, `gender`, `phone`, `email`, `userType`) VALUES ("exampleAdmin", "examplePassword", "exampleFirst", "exampleLast", 1, "male", "exampleAdminPhone", "exampleAdminEmail", 3);

/*
 * Table of users
 */
CREATE TABLE `users` (
	`userID`		int				NOT NULL,
	PRIMARY KEY(`userID`),
	CONSTRAINT `users_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `profiles` (`profileID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
INSERT INTO `users` (`userID`) VALUES (1);
INSERT INTO `users` (`userID`) VALUES (3);

/*
 * Table of trainers
 */
CREATE TABLE `trainers` (
	`trainerID`		int				NOT NULL,
	PRIMARY KEY(`trainerID`),
	CONSTRAINT `trainers_ibfk_1` FOREIGN KEY (`trainerID`) REFERENCES `profiles` (`profileID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
INSERT INTO `trainers` (`trainerID`) VALUES (2);

/*
 * Table of trainer's skills in a given workout from 1-10
 */
CREATE TABLE `trainerSkills` (
	`workoutID`		int				NOT NULL,
	`trainerID`		int				NOT NULL,
	`skill`			int				NOT NULL,
	PRIMARY KEY(`workoutID`),
	KEY `trainerID` (`trainerID`),
	CONSTRAINT `trainerSkills_ibfk_1` FOREIGN KEY (`workoutID`) REFERENCES `workouts` (`workoutID`) ON DELETE CASCADE,
	CONSTRAINT `trainerSkills_ibfk_2` FOREIGN KEY (`trainerID`) REFERENCES `trainers` (`trainerID`) ON DELETE CASCADE,
	CONSTRAINT `trainerSkills_validSkills` CHECK (`skill` BETWEEN 1 AND 10)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*
 * Table of sessions between trainers and users
 */
CREATE TABLE `sessions` (
	`sessionNumber`	int				NOT NULL AUTO_INCREMENT,
	`trainerID`		int				NOT NULL,
	`userID`		int 			NOT NULL,
	`date`			date 			NOT NULL,
	`price`			decimal(10,2)	NOT NULL,
	PRIMARY KEY(`sessionNumber`),
	KEY `trainerID` (`trainerID`),
	KEY `userID` (`userID`),
	CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`trainerID`) REFERENCES `trainers` (`trainerID`),
	CONSTRAINT `sessions_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;