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
-- 資料表結構 `test`
--

CREATE TABLE `test` (
  `account` varchar(12) NOT NULL,
  `exam` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `test`
--

INSERT INTO `test` (`account`, `exam`) VALUES
('test002', '{\"exam\":[{\"enviro_id\":0,\"questions\":[{\"object_id\":1,\"your_answer_id\":2,\"times\":300},{\"object_id\":1,\"your_answer_id\":2,\"times\":300}],\"accuracy\":{\"your\":1,\"all\":10},\"completion\":{\"your\":1,\"all\":10},\"response_rate\":50,\"high_frequency_accuracy\":{\"your\":1,\"all\":3},\"low_frequency_accuracy\":{\"your\":1,\"all\":3}},\"{\\\"questions\\\":[{\\\"object_id\\\":\\\"1\\\",\\\"your_answer_id\\\":\\\"22\\\",\\\"times\\\":0},{\\\"object_id\\\":\\\"22\\\",\\\"your_answer_id\\\":\\\"22\\\",\\\"times\\\":0},{\\\"object_id\\\":\\\"43\\\",\\\"your_answer_id\\\":\\\"22\\\",\\\"times\\\":0},{\\\"object_id\\\":\\\"22\\\",\\\"your_answer_id\\\":\\\"22\\\",\\\"times\\\":0},{\\\"object_id\\\":\\\"23\\\",\\\"your_answer_id\\\":\\\"22\\\",\\\"times\\\":0},{\\\"object_id\\\":\\\"43\\\",\\\"your_answer_id\\\":\\\"22\\\",\\\"times\\\":0},{\\\"object_id\\\":\\\"20\\\",\\\"your_answer_id\\\":\\\"22\\\",\\\"times\\\":0},{\\\"object_id\\\":\\\"20\\\",\\\"your_answer_id\\\":\\\"22\\\",\\\"times\\\":0},{\\\"object_id\\\":\\\"37\\\",\\\"your_answer_id\\\":\\\"22\\\",\\\"times\\\":0},{\\\"object_id\\\":\\\"1\\\",\\\"your_answer_id\\\":\\\"22\\\",\\\"times\\\":0}],\\\"accuracy\\\":{\\\"your\\\":2,\\\"all\\\":10},\\\"completion\\\":{\\\"your\\\":1,\\\"all\\\":10},\\\"response_rate\\\":50,\\\"high_frequency_accuracy\\\":{\\\"your\\\":0,\\\"all\\\":2},\\\"low_frequency_accuracy\\\":{\\\"your\\\":0,\\\"all\\\":6},\\\"enviro_id\\\":\\\"1\\\"}\"]}');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`account`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
