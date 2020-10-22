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
-- 資料表結構 `mission`
--

CREATE TABLE `mission` (
  `id` int(10) NOT NULL,
  `title` varchar(12) NOT NULL,
  `description` varchar(30) NOT NULL,
  `type` varchar(10) NOT NULL,
  `required` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`required`)),
  `rewards` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`rewards`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `mission`
--

INSERT INTO `mission` (`id`, `title`, `description`, `type`, `required`, `rewards`) VALUES
(1, '不給你領獎勵1', '哈哈', '每日任務', '{\"mode\":{\"id\":\"practice\",\"name\":\"練習模式\"},\"counter\":{\"id\":\"once\",\"name\":\"單次\"},\"action\":\"正確次數\",\"times\":\"20\",\"enviro\":null,\"object\":null}', '[{\"type\":\"money\",\"value\":\"100\"}]'),
(2, '不給你領獎勵2', '哈哈', '成長任務', '{\"mode\":{\"id\":\"practice\",\"name\":\"練習模式\"},\"counter\":{\"id\":\"once\",\"name\":\"單次\"},\"action\":\"正確次數\",\"times\":\"20\",\"enviro\":null,\"object\":null}', '[{\"type\":\"money\",\"value\":\"100\"}]'),
(7, '廚房-剪刀-訓練!', '於訓練模式的廚房情境中完整聆聽剪刀聲音5次', '每日任務', '{\"mode\":{\"id\":\"train\",\"name\":\"訓練模式\"},\"counter\":{\"id\":\"once\",\"name\":\"單次\"},\"action\":\"聆聽次數\",\"times\":\"5\",\"enviro\":\"1\",\"object\":\"43\"}', '[{\"type\":\"money\",\"value\":\"100\"}]'),
(8, '熟悉浴室情境', '於訓練模式的浴室情境中完整聆聽任意聲音100次', '成長任務', '{\"mode\":{\"id\":\"train\",\"name\":\"訓練模式\"},\"counter\":{\"id\":\"once\",\"name\":\"單次\"},\"action\":\"聆聽次數\",\"times\":\"100\",\"object\":null,\"enviro\":\"18\"}', '[{\"type\":\"money\",\"value\":\"100\"}]'),
(9, '每日3測', '於測驗模式的任意情境中完整完成測驗', '每日任務', '{\"mode\":{\"id\":\"test\",\"name\":\"測驗模式\"},\"counter\":{\"id\":\"once\",\"name\":\"單次\"},\"action\":\"遊玩次數\",\"times\":\"3\",\"enviro\":null,\"object\":null}', '[{\"type\":\"money\",\"value\":\"100\"}]'),
(10, '在廚房中如魚得水', '於測驗模式的廚房情境正確率達到90%以上', '成長任務', '{\"mode\":{\"id\":\"test\",\"name\":\"測驗模式\"},\"counter\":{\"id\":\"once\",\"name\":\"單次\"},\"action\":\"正確率\",\"times\":\"90\",\"enviro\":\"1\",\"object\":null}', '[{\"type\":\"money\",\"value\":\"100\"}]'),
(11, '熟悉一半的浴室', '於測驗模式的浴室情境中正確率達到50%', '成長任務', '{\"mode\":{\"id\":\"test\",\"name\":\"測驗模式\"},\"counter\":{\"id\":\"once\",\"name\":\"單次\"},\"action\":\"正確率\",\"times\":\"50\",\"enviro\":\"18\",\"object\":null}', '[{\"type\":\"money\",\"value\":\"100\"}]'),
(14, '草原一遊', '於草原情境完整遊玩測驗模式一次', '每日任務', '{\"mode\":{\"id\":\"test\",\"name\":\"測驗模式\"},\"counter\":{\"id\":\"once\",\"name\":\"單次\"},\"action\":\"遊玩次數\",\"times\":\"1\",\"object\":null,\"enviro\":\"20\"}', '[{\"type\":\"money\",\"value\":\"100\"}]');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `mission`
--
ALTER TABLE `mission`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `mission`
--
ALTER TABLE `mission`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
