/*CREATE DATABASE IF NOT EXISTS `db`;*/

USE `db`;

DROP TABLE IF EXISTS `trainerSkills`;
DROP TABLE IF EXISTS `sessions`;
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

/*
 * Table of generic profiles
 */
CREATE TABLE `profiles` (
	`profileID`		int				NOT NULL AUTO_INCREMENT,
	`username`		varchar(50)		UNIQUE NOT NULL,
	`password`		varchar(50)		NOT NULL,
	`firstName`		varchar(50)		NOT NULL,
	`lastName`		varchar(50)		NOT NULL,
	`age`			int				NOT NULL,
	`gender`		varchar(50)		NOT NULL,
	`phone`			varchar(50)		UNIQUE NOT NULL,
	`email`			varchar(50) 	UNIQUE NOT NULL,
	`pfp`			varchar(50)		DEFAULT NULL,
	`description`	varchar(500)	DEFAULT NULL,
	`userType`		int				NOT NULL,
	PRIMARY KEY(`profileID`),
	KEY `userType` (`userType`),
	CONSTRAINT `profiles_ibfk_1` FOREIGN KEY (`userType`) REFERENCES `userTypes` (`userType`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*
 * Table of trainer's skills in a given workout from 1-10
 */
CREATE TABLE `trainerSkills` (
	`workoutID`		int				NOT NULL,
	`profileID`		int				NOT NULL,
	`skill`			int				NOT NULL,
	PRIMARY KEY(`workoutID`),
	KEY `profileID` (`profileID`),
	CONSTRAINT `trainerSkills_ibfk_1` FOREIGN KEY (`workoutID`) REFERENCES `workouts` (`workoutID`),
	CONSTRAINT `trainerSkills_ibfk_2` FOREIGN KEY (`profileID`) REFERENCES `profiles` (`profileID`),
	CONSTRAINT `trainerSkills_ibfk_3` CHECK (`skill` BETWEEN 1 AND 10)
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
	CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`trainerID`) REFERENCES `profiles` (`profileID`),
	CONSTRAINT `sessions_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `profiles` (`profileID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;