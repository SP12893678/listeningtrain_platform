-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2020 年 09 月 02 日 18:33
-- 伺服器版本： 10.4.13-MariaDB
-- PHP 版本： 7.2.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
-- 資料表結構 `roleClothes`
--

CREATE TABLE `roleClothes` (
  `id` int(11) NOT NULL,
  `account` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `gender` char(2) COLLATE utf8_unicode_ci NOT NULL,
  `hair` text COLLATE utf8_unicode_ci DEFAULT '',
  `clothes` text COLLATE utf8_unicode_ci DEFAULT '',
  `cleft` text COLLATE utf8_unicode_ci DEFAULT '',
  `cright` text COLLATE utf8_unicode_ci DEFAULT '',
  `bottoms` text COLLATE utf8_unicode_ci DEFAULT '',
  `shoe` text COLLATE utf8_unicode_ci DEFAULT '',
  `sright` text COLLATE utf8_unicode_ci DEFAULT '',
  `h_deco` text COLLATE utf8_unicode_ci DEFAULT '',
  `wrist_deco` text COLLATE utf8_unicode_ci DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `roleClothes`
--

INSERT INTO `roleClothes` (`id`, `account`, `gender`, `hair`, `clothes`, `cleft`, `cright`, `bottoms`, `shoe`, `sright`, `h_deco`, `wrist_deco`) VALUES
(1, 'test', 'mm', '4,3,2', '3', '3', '3', '1', '1', '1', '2', '1'),
(2, 'test', 'gg', '4', '3', '3', '3', '1', '1', '1', '2', '1'),
(16, '55', 'mm', '1,3,6', '1,2', '1,2', '1,2', '2', '1', '1', '', ''),
(17, '33', 'gg', '1,3', '4,3,1,5', '4,3,1,5', '4,3,1,5', '3,2', '1,2', '1,2', '', '1');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `roleClothes`
--
ALTER TABLE `roleClothes`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `roleClothes`
--
ALTER TABLE `roleClothes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
