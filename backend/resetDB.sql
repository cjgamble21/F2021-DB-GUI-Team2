CREATE DATABASE IF NOT EXISTS `test`;

USE `test`;

-- DROP TABLE IF EXISTS `trainerSkills`;
-- DROP TABLE IF EXISTS `sessions`;
-- DROP TABLE IF EXISTS `workouts`;
-- DROP TABLE IF EXISTS `trainers`;
-- DROP TABLE IF EXISTS `profiles`;
-- DROP TABLE IF EXISTS `users`;

/*
 * Table of user accounts
 */
CREATE TABLE `users` (
	`userID`		int				NOT NULL AUTO_INCREMENT,
	`username`		varchar(50) 	UNIQUE NOT NULL,
	`password`		varchar(200) 	NOT NULL,
	`userType`		varchar(10)		NOT NULL
	PRIMARY KEY(`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*
 * Table of generic profiles
 */
CREATE TABLE `memberProfiles` (
	`memberID`		int				NOT NULL AUTO_INCREMENT,
	`firstName`		varchar(50)		NOT NULL,
	`lastName`		varchar(50)		NOT NULL,
	`age`			int				NOT NULL,
    `userID`        int             NOT NULL,
	`userType`		varchar(10)		NOT NULL,
	PRIMARY KEY(`memberID`),
    KEY `userID` (`userID`),
    CONSTRAINT `memberProfiles_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`)
	CONSTRAINT `memberProfiles_chk_1` CHECK (`userType` = "member")
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `trainerProfiles` (
	`trainerID`		int 		   NOT NULL AUTO_INCREMENT,
	`firstName`		varchar(50)		NOT NULL,
	`lastName`		varchar(50)		NOT NULL,
	`age`			int				NOT NULL,
	`gender`		varchar(50)		NOT NULL,
	`phone`			varchar(50)		UNIQUE NOT NULL,
	`email`			varchar(50) 	UNIQUE NOT NULL,
	`pfp`			varchar(50)		DEFAULT NULL,
	`description`	varchar(500)	DEFAULT NULL,
    `userID`        int             NOT NULL,
	PRIMARY KEY(`trainerID`),
    KEY `userID` (`userID`),
    CONSTRAINT `trainerProfiles_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`)
	CONSTRAINT `trainerProfiles_chk_1` CHECK (`userType` = "trainer")
) sENGINE=InnoDB DEFAULT CHARSET=latin1;

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
 * Table of trainer's skills in a given workout from 1-10
 */
CREATE TABLE `trainerSkills` (
	`workoutID`		int				NOT NULL,
	`trainerID`		int				NOT NULL,
	`skill`			int				NOT NULL,
	PRIMARY KEY(`workoutID`),
	KEY `trainerID` (`trainerID`),
	CONSTRAINT `trainerSkills_ibfk_1` FOREIGN KEY (`workoutID`) REFERENCES `workouts` (`workoutID`),
	CONSTRAINT `trainerSkills_ibfk_2` FOREIGN KEY (`trainerID`) REFERENCES `trainerProfiles` (`trainerID`),
	CONSTRAINT `trainerSkills_ibfk_3` CHECK (`skill` BETWEEN 1 AND 10)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*
 * Table of sessions between trainers and users
 */
CREATE TABLE `sessions` (
	`sessionID`		int					NOT NULL AUTO_INCREMENT,
	`trainerID`		int					NOT NULL,
	`userID`		int 				NOT NULL,
	`datetime`		datetime 			NOT NULL,
	`price`			decimal(10,2)		NOT NULL,
	PRIMARY KEY(`sessionID`),
	KEY `trainerID` (`trainerID`),
	KEY `userID` (`userID`),
	CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`trainerID`) REFERENCES `trainerProfiles` (`trainerID`),
	CONSTRAINT `sessions_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

