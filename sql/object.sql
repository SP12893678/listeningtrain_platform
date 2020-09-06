-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2020-09-06 14:09:11
-- 伺服器版本： 10.4.13-MariaDB
-- PHP 版本： 7.3.20

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
-- 資料表結構 `object`
--

CREATE TABLE `object` (
  `id` int(11) NOT NULL,
  `pic_src` text CHARACTER SET utf8 NOT NULL,
  `sound_src` text CHARACTER SET utf8 NOT NULL,
  `name` varchar(10) CHARACTER SET utf8 NOT NULL,
  `coordinate` varchar(100) CHARACTER SET utf8 NOT NULL,
  `size` int(11) DEFAULT 5,
  `scale` text COLLATE utf8_bin NOT NULL DEFAULT '1',
  `angle` varchar(3) COLLATE utf8_bin NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 傾印資料表的資料 `object`
--

INSERT INTO `object` (`id`, `pic_src`, `sound_src`, `name`, `coordinate`, `size`, `scale`, `angle`) VALUES
(1, '../static/images/enviro/object/knife_4x.png', '6', '菜刀', '387,218', 12, '0.41379310344828', '10'),
(2, '../static/images/enviro/object/pot_4x.png', '8', '沸水', '484,241', 72, '0.4286', '0'),
(19, '../static/images/enviro/object/水龍頭.png', '28', '洗碗', '294,259', 92, '1.5082', '0'),
(20, '../static/images/enviro/object/烤土司.png', '11', '烤麵包機', '208,210', 72, '1.6744', '0'),
(21, '../static/images/enviro/object/洗手臺.png', '64', '水龍頭', '576,264', 157, '1.6354', '0'),
(22, '../static/images/enviro/object/資產 3.png', '49', '瓶子', '557,357', 22, '0.4681', '0'),
(23, '../static/images/enviro/object/掃把@4x.png', '22', '掃地', '156,311', 32, '1', '0'),
(24, '../static/images/enviro/object/資產 3@2x.png', '3', '貓', '560,489', 102, '0.13010204081633', '0'),
(26, '../static/images/enviro/object/資產 8@4x.png', '42', '烏鴉', '641,278', 82, '0.28571428571429', '0'),
(27, '../static/images/enviro/object/資產 3@4x.png', '10', '狗', '445,361', 62, '0.44444444444444', '0'),
(28, '../static/images/enviro/object/資產 1@4x.png', '7', '貓頭鷹', '288,145', 92, '0.58505564387917', '0'),
(29, '../static/images/enviro/object/獅子@4x.png', '53', '獅子', '220,416', 202, '1.3859348198971', '0'),
(32, '../static/images/enviro/object/老鼠.png', '15', '老鼠', '483,515', 32, '0.059590316573557', '0'),
(33, '../static/images/enviro/object/牙膏牙刷@4x.png', '23', '刷牙', '597,169', 117, '1.5244', '0'),
(34, '../static/images/enviro/object/毛巾@4x.png', '65', '毛巾', '400,266', 182, '1.78', '0'),
(35, '../static/images/enviro/object/馬桶@4x.png', '21', '馬桶', '-34,331', 107, '1.1791', '0'),
(37, '../static/images/enviro/object/吊扇@2x.png', '45', '吊扇', '384,47', 215, '1.2684', '0'),
(39, '../static/images/enviro/object/青蛙@2x.png', '81', '樹蛙', '587,378', 42, '0.30324909747292', '0'),
(40, '../static/images/enviro/object/吸塵器@2x.png', '40', '吸塵器', '788,413', 192, '0.6725', '0'),
(41, '../static/images/enviro/object/櫃子@2x.png', '82', '木櫃', '782,402', 152, '1.1969', '0'),
(42, '../static/images/enviro/object/果汁機2.png', '83', '果汁機', '619,225', 47, '0.2186', '0'),
(43, '../static/images/enviro/object/剪刀.png', '44', '剪刀', '664,410', 62, '0.0142', '0'),
(44, '../static/images/enviro/object/山羊@2x.png', '84', '山羊', '737,341', 97, '0.91079812206573', '0'),
(45, '../static/images/enviro/object/牛.png', '85', '牛', '741,457', 157, '0.95151515151515', '0');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `object`
--
ALTER TABLE `object`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `object`
--
ALTER TABLE `object`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
