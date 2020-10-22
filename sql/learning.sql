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
('test002', '{\"train\":[{\"enviro\":\"1\",\"id\":\"43\",\"time\":\"2020-10-11 10:39:53\"},{\"enviro\":\"1\",\"id\":\"43\",\"time\":\"2020-10-12 10:50:29\"},{\"enviro\":\"1\",\"id\":\"22\",\"time\":\"2020-10-12 10:50:32\"},{\"enviro\":\"1\",\"id\":\"43\",\"time\":\"2020-10-13 0:17:50\"},{\"enviro\":\"1\",\"id\":\"43\",\"time\":\"2020-10-13 14:57:44\"},{\"enviro\":\"1\",\"id\":\"43\",\"time\":\"2020-10-13 14:57:46\"},{\"enviro\":\"1\",\"id\":\"43\",\"time\":\"2020-10-13 14:57:48\"},{\"enviro\":\"1\",\"id\":\"43\",\"time\":\"2020-10-13 14:57:50\"},{\"enviro\":\"1\",\"id\":\"43\",\"time\":\"2020-10-14 15:7:58\"},{\"enviro\":\"1\",\"id\":\"43\",\"time\":\"2020-10-14 15:7:59\"},{\"enviro\":\"1\",\"id\":\"43\",\"time\":\"2020-10-14 15:8:1\"},{\"enviro\":\"1\",\"id\":\"43\",\"time\":\"2020-10-14 15:8:3\"},{\"enviro\":\"1\",\"id\":\"43\",\"time\":\"2020-10-14 15:8:5\"},{\"enviro\":\"18\",\"id\":\"21\",\"time\":\"2020-10-14 20:59:21\"},{\"enviro\":\"18\",\"id\":\"34\",\"time\":\"2020-10-14 20:59:27\"},{\"enviro\":\"18\",\"id\":\"41\",\"time\":\"2020-10-14 20:59:38\"},{\"enviro\":\"18\",\"id\":\"34\",\"time\":\"2020-10-14 21:0:15\"}]}', '{\"practice\":[]}', '{\"test\":[{\"questions\":[{\"object_id\":\"43\",\"your_answer_id\":\"43\",\"times\":0},{\"object_id\":\"19\",\"your_answer_id\":\"43\",\"times\":0},{\"object_id\":\"43\",\"your_answer_id\":\"43\",\"times\":0},{\"object_id\":\"40\",\"your_answer_id\":\"43\",\"times\":0},{\"object_id\":\"40\",\"your_answer_id\":\"43\",\"times\":0},{\"object_id\":\"37\",\"your_answer_id\":\"43\",\"times\":0},{\"object_id\":\"43\",\"your_answer_id\":\"43\",\"times\":0},{\"object_id\":\"2\",\"your_answer_id\":\"43\",\"times\":0},{\"object_id\":\"22\",\"your_answer_id\":\"43\",\"times\":0},{\"object_id\":\"19\",\"your_answer_id\":\"43\",\"times\":0}],\"accuracy\":{\"your\":3,\"all\":10},\"completion\":{\"your\":1,\"all\":10},\"response_rate\":50,\"high_frequency_accuracy\":{\"your\":3,\"all\":3},\"low_frequency_accuracy\":{\"your\":0,\"all\":6},\"enviro_id\":\"1\",\"time\":\"2020-10-12 11:30:12\"},{\"questions\":[{\"object_id\":\"42\",\"your_answer_id\":\"22\",\"times\":0},{\"object_id\":\"20\",\"your_answer_id\":\"43\",\"times\":0},{\"object_id\":\"20\",\"your_answer_id\":\"43\",\"times\":0},{\"object_id\":\"2\",\"your_answer_id\":\"43\",\"times\":0},{\"object_id\":\"37\",\"your_answer_id\":\"43\",\"times\":0},{\"object_id\":\"40\",\"your_answer_id\":\"43\",\"times\":0},{\"object_id\":\"37\",\"your_answer_id\":\"43\",\"times\":0},{\"object_id\":\"23\",\"your_answer_id\":\"43\",\"times\":0},{\"object_id\":\"2\",\"your_answer_id\":\"43\",\"times\":0},{\"object_id\":\"20\",\"your_answer_id\":\"43\",\"times\":0}],\"accuracy\":{\"your\":0,\"all\":10},\"completion\":{\"your\":0,\"all\":10},\"response_rate\":50,\"high_frequency_accuracy\":{\"your\":0,\"all\":0},\"low_frequency_accuracy\":{\"your\":0,\"all\":10},\"enviro_id\":\"1\",\"time\":\"2020-10-13 0:17:34\"},{\"questions\":[{\"object_id\":\"27\",\"your_answer_id\":\"29\",\"times\":0},{\"object_id\":\"45\",\"your_answer_id\":\"27\",\"times\":0},{\"object_id\":\"26\",\"your_answer_id\":\"28\",\"times\":0},{\"object_id\":\"44\",\"your_answer_id\":\"29\",\"times\":0},{\"object_id\":\"44\",\"your_answer_id\":\"24\",\"times\":0},{\"object_id\":\"28\",\"your_answer_id\":\"44\",\"times\":0},{\"object_id\":\"32\",\"your_answer_id\":\"26\",\"times\":0},{\"object_id\":\"39\",\"your_answer_id\":\"45\",\"times\":0},{\"object_id\":\"45\",\"your_answer_id\":\"27\",\"times\":0},{\"object_id\":\"29\",\"your_answer_id\":\"29\",\"times\":0}],\"accuracy\":{\"your\":1,\"all\":10},\"completion\":{\"your\":1,\"all\":9},\"response_rate\":50,\"high_frequency_accuracy\":{\"your\":0,\"all\":3},\"low_frequency_accuracy\":{\"your\":1,\"all\":4},\"enviro_id\":\"20\",\"time\":\"2020-10-14 20:58:41\"}]}');

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
