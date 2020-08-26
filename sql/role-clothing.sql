-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2020 年 08 月 26 日 14:13
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
-- 資料表結構 `role-clothing`
--

CREATE TABLE `role-clothing` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `gender` char(2) COLLATE utf8_unicode_ci NOT NULL,
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
-- 傾印資料表的資料 `role-clothing`
--

INSERT INTO `role-clothing` (`id`, `name`, `gender`, `hair`, `clothes`, `cleft`, `cright`, `bottoms`, `shoe`, `sright`, `h_deco`, `wrist_deco`) VALUES
(1, 'emily', 'gg', 'Character/hair/gg/hair1_gg', 'Character/clothes/clothes1_gg', 'Character/cleft/c1_l_gg', 'Character/cright/c1_r_gg', 'Character/bottoms/pant1_gg', 'Character/sleft/shoe1_l_gg', 'Character/sright/s1_r_gg', '', ''),
(5, 'el', 'mm', 'Character/hair/mm/hair1', 'Character/clothes/clothes1_mm', 'Character/cleft/c1_l_mm', 'Character/cright/c1_r_mm', 'Character/bottoms/skirt2_mm', 'Character/sleft/shoe1_l_mm', 'Character/sright/s1_r_mm', '', ''),
(6, 'Mary', 'mm', 'Character/hair/mm/hair1', 'Character/clothes/clothes1_mm', 'Character/cleft/c1_l_mm', 'Character/cright/c1_r_mm', 'Character/bottoms/skirt1_mm', 'Character/sleft/shoe1_l_mm', 'Character/sright/s1_r_mm', 'Character/h_deco/h_deco2_mm', 'Character/wrist_deco/wrist_deco1_gg_mm'),
(7, 'test', 'mm', 'Character/hair/mm/hair2', 'Character/clothes/clothes1_mm', 'Character/cleft/c1_l_mm', 'Character/cright/c1_r_mm', 'Character/bottoms/skirt1_mm', 'Character/sleft/shoe1_l_mm', 'Character/sright/s1_r_mm', 'Character/h_deco/h_deco2_mm', 'Character/wrist_deco/wrist_deco1_gg_mm');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `role-clothing`
--
ALTER TABLE `role-clothing`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `role-clothing`
--
ALTER TABLE `role-clothing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
