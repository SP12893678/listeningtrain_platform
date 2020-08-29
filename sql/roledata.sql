-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2020 年 08 月 29 日 16:08
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
-- 資料表結構 `roledata`
--

CREATE TABLE `roledata` (
  `account` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `nickname` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `gender` char(2) COLLATE utf8_unicode_ci NOT NULL,
  `birthday` date NOT NULL,
  `title` text COLLATE utf8_unicode_ci NOT NULL,
  `money` int(11) NOT NULL,
  `hair` text COLLATE utf8_unicode_ci NOT NULL,
  `clothes` text COLLATE utf8_unicode_ci NOT NULL,
  `cleft` text COLLATE utf8_unicode_ci NOT NULL,
  `cright` text COLLATE utf8_unicode_ci NOT NULL,
  `bottoms` text COLLATE utf8_unicode_ci NOT NULL,
  `shoe` text COLLATE utf8_unicode_ci NOT NULL,
  `sright` text COLLATE utf8_unicode_ci NOT NULL,
  `h_deco` text COLLATE utf8_unicode_ci NOT NULL,
  `wrist_deco` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `roledata`
--

INSERT INTO `roledata` (`account`, `nickname`, `gender`, `birthday`, `title`, `money`, `hair`, `clothes`, `cleft`, `cright`, `bottoms`, `shoe`, `sright`, `h_deco`, `wrist_deco`) VALUES
('test', 'EL', 'mm', '2020-08-27', 'newPlayer', 0, 'Character/hair/mm/hair4', 'Character/clothes/clothes3_mm', 'Character/cleft/c3_l_mm', 'Character/cright/c3_r_mm', 'Character/bottoms/skirt1_mm', 'Character/sleft/shoe1_l_mm', 'Character/sright/s1_r_mm', 'Character/h_deco/h_deco2_mm', 'Character/wrist_deco/wrist_deco1_gg_mm');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `roledata`
--
ALTER TABLE `roledata`
  ADD PRIMARY KEY (`account`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
