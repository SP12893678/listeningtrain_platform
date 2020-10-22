-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 
-- 伺服器版本： 10.4.11-MariaDB
-- PHP 版本： 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `listeningtrain_platform2`
--

-- --------------------------------------------------------

--
-- 資料表結構 `learning`
--

CREATE TABLE `learning` (
  `account` varchar(12) NOT NULL,
  `train` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT '""',
  `practice` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT '""',
  `test` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT '""'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `learning`
--

INSERT INTO `learning` (`account`, `train`, `practice`, `test`) VALUES
('test002', '{\"train\":[{\"items\":[{\"enviro\":\"1\",\"id\":\"43\",\"time\":\"2020-10-21 10:44:57\"},{\"enviro\":\"1\",\"id\":\"43\",\"time\":\"2020-10-21 10:45:0\"}],\"time\":\"2020-10-21 10:44:53\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"1\",\"id\":\"22\",\"time\":\"2020-10-21 10:48:41\"},{\"enviro\":\"1\",\"id\":\"43\",\"time\":\"2020-10-21 10:48:45\"}],\"time\":\"2020-10-21 10:48:35\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"1\",\"id\":\"43\",\"time\":\"2020-10-21 10:52:9\"},{\"enviro\":\"1\",\"id\":\"22\",\"time\":\"2020-10-21 10:52:15\"}],\"time\":\"2020-10-21 10:52:7\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"18\",\"id\":\"21\",\"time\":\"2020-10-21 10:52:38\"},{\"enviro\":\"18\",\"id\":\"34\",\"time\":\"2020-10-21 10:52:43\"},{\"enviro\":\"18\",\"id\":\"33\",\"time\":\"2020-10-21 10:52:50\"}],\"time\":\"2020-10-21 10:52:33\",\"enviro\":\"18\"}]}', '{\"practice\":[{\"time\":\"2020-10-22 11:43:32\",\"enviro\":\"1\",\"questions\":[{\"object_id\":\"1\",\"your_answer\":[\"22\",\"1\"]},{\"object_id\":\"42\",\"your_answer\":[\"42\"]},{\"object_id\":\"22\",\"your_answer\":null}]},{\"time\":\"2020-10-22 12:7:40\",\"enviro\":\"1\",\"questions\":[{\"object_id\":\"43\",\"your_answer\":[\"43\"]},{\"object_id\":\"43\",\"your_answer\":[\"43\"]},{\"object_id\":\"37\",\"your_answer\":null}]},{\"time\":\"2020-10-22 13:47:53\",\"enviro\":\"1\",\"questions\":[{\"object_id\":\"22\",\"your_answer\":[\"22\"]},{\"object_id\":\"43\",\"your_answer\":[\"43\"]},{\"object_id\":\"22\",\"your_answer\":null}]}]}', '{\"test\":[{\"questions\":[{\"object_id\":\"2\",\"your_answer_id\":\"22\",\"times\":0},{\"object_id\":\"23\",\"your_answer_id\":\"22\",\"times\":0},{\"object_id\":\"2\",\"your_answer_id\":\"22\",\"times\":0},{\"object_id\":\"43\",\"your_answer_id\":\"22\",\"times\":0},{\"object_id\":\"2\",\"your_answer_id\":\"22\",\"times\":0},{\"object_id\":\"42\",\"your_answer_id\":\"22\",\"times\":0},{\"object_id\":\"23\",\"your_answer_id\":\"22\",\"times\":0},{\"object_id\":\"43\",\"your_answer_id\":\"22\",\"times\":0},{\"object_id\":\"23\",\"your_answer_id\":\"22\",\"times\":0},{\"object_id\":\"2\",\"your_answer_id\":\"22\",\"times\":0}],\"accuracy\":{\"your\":0,\"all\":10},\"completion\":{\"your\":0,\"all\":10},\"response_rate\":50,\"high_frequency_accuracy\":{\"your\":0,\"all\":2},\"low_frequency_accuracy\":{\"your\":0,\"all\":8},\"enviro_id\":\"1\",\"time\":\"2020-10-22 11:44:52\"}]}');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `learning`
--
ALTER TABLE `learning`
  ADD PRIMARY KEY (`account`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
