CREATE DATABASE IF NOT EXISTS `db`;

USE `db`;

DROP TABLE IF EXISTS `reviews`;
DROP TABLE IF EXISTS `gymOwnership`;
DROP TABLE IF EXISTS `trainerSkills`;
DROP TABLE IF EXISTS `requests`;
DROP TABLE IF EXISTS `offers`;
DROP TABLE IF EXISTS `sessions`;
DROP TABLE IF EXISTS `trainers`;
DROP TABLE IF EXISTS `gymInfo`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `admins`;
DROP TABLE IF EXISTS `profiles`;
DROP TABLE IF EXISTS `userTypes`;
DROP TABLE IF EXISTS `workouts`;

/*
 * Table of gymInfo
 */
CREATE TABLE `gymInfo`(
    `gymID`  int     UNIQUE NOT NULL,
    `name`  varchar(50)		UNIQUE DEFAULT NULL,
	`address`		varchar(200)	DEFAULT NULL,
    `description`   varchar(500)    DEFAULT NULL,
    `logo`  varchar(500)    DEFAULT NULL,
    PRIMARY KEY(`gymID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*
 * Table of available workouts at the gym
 */
CREATE TABLE `workouts` (
	`workoutID`		int				UNIQUE NOT NULL,
	`workout`		varchar(50)		UNIQUE NOT NULL,
	`description`	varchar(500)	NOT NULL,
	PRIMARY KEY(`workoutID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*
 * Table of user types
 */
CREATE TABLE `userTypes` (
	`userType`		int				UNIQUE NOT NULL,
	`description`	varchar(500)	NOT NULL,
	PRIMARY KEY(`userType`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `userTypes` (`userType`, `description`) VALUES (1, "user");
INSERT INTO `userTypes` (`userType`, `description`) VALUES (2, "trainer");
INSERT INTO `userTypes` (`userType`, `description`) VALUES (3, "admin");

/*
 * Table of generic profiles
 */
CREATE TABLE `profiles` (
	`profileID`		int				UNIQUE NOT NULL,
	`username`		varchar(50)		UNIQUE NOT NULL,
	`password`		varchar(100)	NOT NULL,
	`firstName`		varchar(50)		DEFAULT NULL,
	`lastName`		varchar(50)		DEFAULT NULL,
	`age`			int				DEFAULT NULL,
	`gender`		varchar(50)		DEFAULT NULL,
	`phone`			varchar(50)		UNIQUE DEFAULT NULL,
	`email`			varchar(50) 	UNIQUE DEFAULT NULL,
	`pfp`			varchar(500)	DEFAULT NULL,
	`description`	varchar(500)	DEFAULT NULL,
	`userType`		int				NOT NULL,
	PRIMARY KEY(`profileID`),
	KEY `userType` (`userType`),
	CONSTRAINT `profiles_ibfk_1` FOREIGN KEY (`userType`) REFERENCES `userTypes` (`userType`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*
 * Table of users
 */
CREATE TABLE `users` (
	`userID`		int				NOT NULL,
	PRIMARY KEY(`userID`),
	CONSTRAINT `users_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `profiles` (`profileID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*
 * Table of trainers
 */
CREATE TABLE `trainers` (
	`trainerID`		int				NOT NULL,
	`gymID`         int             DEFAULT NULL,
	`rate`			decimal(8,2)	DEFAULT NULL,
	PRIMARY KEY(`trainerID`),
	CONSTRAINT `trainers_ibfk_1` FOREIGN KEY (`trainerID`) REFERENCES `profiles` (`profileID`) ON DELETE CASCADE,
    CONSTRAINT `trainers_ibfk_2` FOREIGN KEY (`gymID`) REFERENCES `gymInfo` (`gymID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*
 * Table of trainer's skills in a given workout from 1-10
 */
CREATE TABLE `trainerSkills` (
	`workoutID`		int				NOT NULL,
	`trainerID`		int				NOT NULL,
	`skill`			int				NOT NULL,
	PRIMARY KEY(`workoutID`, `trainerID`),
	KEY `workoutID` (`workoutID`),
	KEY `trainerID` (`trainerID`),
	CONSTRAINT `trainerSkills_ibfk_1` FOREIGN KEY (`workoutID`) REFERENCES `workouts` (`workoutID`) ON DELETE CASCADE,
	CONSTRAINT `trainerSkills_ibfk_2` FOREIGN KEY (`trainerID`) REFERENCES `trainers` (`trainerID`) ON DELETE CASCADE,
	CONSTRAINT `trainerSkills_validSkills` CHECK (`skill` BETWEEN 1 AND 10)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*
 * Table of requested sessions
 */
CREATE TABLE `requests` (
	`requestID`		int				UNIQUE NOT NULL,
	`userID`		int				NOT NULL,
	`trainerID`		int				NOT NULL,
	`date`			datetime		NOT NULL,
	PRIMARY KEY(`requestID`),
	KEY `userID` (`userID`),
	KEY `trainerID` (`trainerID`),
	CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE,
	CONSTRAINT `requests_ibfk_2` FOREIGN KEY (`trainerID`) REFERENCES `trainers` (`trainerID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*
 * Table of offered sessions
 */
CREATE TABLE `offers` (
	`offerID`		int				UNIQUE NOT NULL,
	`trainerID`		int				NOT NULL,
	`date`			datetime		NOT NULL,
	`price`			decimal(10,2)	NOT NULL,
	PRIMARY KEY(`offerID`),
	KEY `trainerID` (`trainerID`),
	CONSTRAINT `offers_ibfk_1` FOREIGN KEY (`trainerID`) REFERENCES `trainers` (`trainerID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*
 * Table of sessions between trainers and users
 */
CREATE TABLE `sessions` (
	`sessionNumber`	int			    UNIQUE NOT NULL,
	`trainerID`		int				NOT NULL,
	`userID`		int 			NOT NULL,
	`date`			datetime 		NOT NULL,
	`price`			decimal(10,2)	NOT NULL,
	PRIMARY KEY(`sessionNumber`),
	KEY `trainerID` (`trainerID`),
	KEY `userID` (`userID`),
	CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`trainerID`) REFERENCES `trainers` (`trainerID`),
	CONSTRAINT `sessions_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*
 * Table of admins
 */
CREATE TABLE `admins`(
    `adminID`  int     NOT NULL,
    PRIMARY KEY(`adminID`),
    CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`adminID`) REFERENCES `profiles` (`profileID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*
 * Table connects gym and admin
 */
CREATE TABLE `gymOwnership`(
    `gymID`     int     NOT NULL,
    `adminID`   int     NOT NULL,
    PRIMARY KEY(`gymID`, `adminID`),
    KEY `gymID` (`gymID`),
    KEY `adminID` (`adminID`),
    CONSTRAINT `gymOwnership_ibfk_1` FOREIGN KEY (`gymID`) REFERENCES `gymInfo` (`gymID`) ON DELETE CASCADE,
    CONSTRAINT `gymOwnership_ibfk_2` FOREIGN KEY (`adminID`) REFERENCES `admins` (`adminID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*
 *  Table of Reviews
 */
CREATE TABLE `reviews`(
    `reviewID`  int     UNIQUE NOT NULL,
    `message`   varchar(500)    NOT NULL,
    `rating`    int     NOT NULL,
    `gymID`     int     NOT NULL,
    PRIMARY KEY(`reviewID`),
    KEY `gymID`(`gymID`),
    CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`gymID`) REFERENCES `gymInfo` (`gymID`) ON DELETE CASCADE,
    CONSTRAINT `reviews_validRatings` CHECK (`rating` BETWEEN 1 AND 5)

)ENGINE=InnoDB DEFAULT CHARSET=latin1;

