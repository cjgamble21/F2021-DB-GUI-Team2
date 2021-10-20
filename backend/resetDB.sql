CREATE DATABASE IF NOT EXISTS `db`;

USE `db`;

DROP TABLE IF EXISTS `trainerSkills`;
DROP TABLE IF EXISTS `sessions`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `trainers`;
DROP TABLE IF EXISTS `profiles`;
DROP TABLE IF EXISTS `workouts`;

/*
 * Table of generic profiles
 */
CREATE TABLE `profiles` (
	`profileID`		int				NOT NULL AUTO_INCREMENT,
	`firstName`		varchar(50)		NOT NULL,
	`lastName`		varchar(50)		NOT NULL,
	`age`			int				NOT NULL,
	`gender`		varchar(50)		NOT NULL,
	`phone`			varchar(50)		UNIQUE NOT NULL,
	`email`			varchar(50) 	UNIQUE NOT NULL,
	`pfp`			varchar(50)		DEFAULT NULL,
	`description`	varchar(500)	DEFAULT NULL,
	PRIMARY KEY(`profileID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*
 * Table of user accounts
 */
CREATE TABLE `users` (
	`userID`		int				NOT NULL AUTO_INCREMENT,
	`username`		varchar(50) 	UNIQUE NOT NULL,
	`password`		varchar(50) 	NOT NULL,
	`admin`			bool			DEFAULT false,
	`profileID`		int				NOT NULL,
	PRIMARY KEY(`userID`),
	KEY `profileID` (`profileID`),
	CONSTRAINT `users_ibfk_1` FOREIGN KEY (`profileID`) REFERENCES `profiles` (`profileID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*
 * Table of trainer accounts
 */
CREATE TABLE `trainers` (
	`trainerID`		int 			NOT NULL AUTO_INCREMENT,
	`username`		varchar(50) 	UNIQUE NOT NULL,
	`password`		varchar(50) 	NOT NULL,
	`profileID`		int				NOT NULL,
	PRIMARY KEY(`trainerID`),
	KEY `profileID` (`profileID`),
	CONSTRAINT `trainers_ibfk_1` FOREIGN KEY (`profileID`) REFERENCES `profiles` (`profileID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
	CONSTRAINT `trainerSkills_ibfk_2` FOREIGN KEY (`trainerID`) REFERENCES `trainers` (`trainerID`),
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
	CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`trainerID`) REFERENCES `trainers` (`trainerID`),
	CONSTRAINT `sessions_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;