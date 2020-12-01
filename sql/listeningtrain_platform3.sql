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
-- 資料表結構 `admin`
--

CREATE TABLE `admin` (
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `admin`
--

INSERT INTO `admin` (`username`, `password`) VALUES
('root', '110124131');

-- --------------------------------------------------------

--
-- 資料表結構 `data`
--

CREATE TABLE `data` (
  `id` int(11) NOT NULL,
  `pic_src` text DEFAULT NULL,
  `sound_src` text NOT NULL,
  `category` text NOT NULL,
  `name` varchar(10) NOT NULL,
  `frequency` varchar(35) NOT NULL,
  `waveform` varchar(15) NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `audio_id` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `data`
--

INSERT INTO `data` (`id`, `pic_src`, `sound_src`, `category`, `name`, `frequency`, `waveform`, `created_time`, `audio_id`) VALUES
(1, '../picture/iron_door.jpg', '../static/sound/house/knocking_an_iron_door1.mp3', '房子', '鐵置門', '<100', '低頻高', '2020-09-27 01:34:59', 'iron_door'),
(4, '../picture/shrill_whistle.jpg', '../static/sound/school/shrill_whistle1.mp3', '學校', '哨子', '2000~4000', '中間高，兩邊低', '2018-12-06 03:56:21', 'whistle'),
(3, '../picture/cat.jpg', '../static/sound/animal/cat1a.mp3', '動物', '貓', '1000~2000;2000~4000', '平緩', '2018-12-04 13:58:52', 'cat'),
(42, '../picture/crow.jpg', '../static/sound/animal/crow1.mp3', '動物', '烏鴉', '1000~2000', '中間高，兩邊低', '2018-12-06 02:46:40', 'crow'),
(10, '../picture/dog.jpg', '../static/sound/animal/dog_barking1.mp3', '動物', '狗吠', '1000~2000', '中間高，兩邊低', '2018-12-06 03:51:16', 'dog_bark'),
(6, '../picture/cooking-cutting.jpg', '../static/sound/cook/cutting_a_onion3.mp3', '廚房、餐廳', '切菜', '100~1000', '中間高，兩邊低', '2018-12-03 09:21:47', 'cooking_cutting'),
(7, '../picture/owl.jpg', '../static/sound/animal/owl.mp3', '動物', '貓頭鷹', '100~1000', '平緩', '2018-12-03 09:21:55', 'owl'),
(8, '../picture/boiling.jpg', '../static/sound/cook/boiling1.mp3', '廚房、餐廳', '沸水', '<100', '平緩', '2018-12-03 09:22:07', 'boiling'),
(9, '../picture/drinking.jpg', '../static/sound/cook/drinking1.mp3', '廚房、餐廳', '喝水', '100~1000', '低頻高', '2018-12-03 09:22:18', 'drinking'),
(49, '../picture/putting_a_bottle.jpg', '../static/sound/cook/putting_a_bottle1.mp3', '廚房、餐廳', '放瓶子', '1000~2000', '中間高，兩邊低', '2018-12-06 03:14:25', 'putting_a_bottle'),
(43, '../picture/roast.jpg', '../static/sound/cook/roast.mp3', '廚房、餐廳', '炒菜', '<100', '低頻高', '2018-12-06 03:57:30', 'roast'),
(12, '../picture/tableware.jpg', '../static/sound/cook/tableware.mp3', '廚房、餐廳', '擺盤', '4000~7000', '平緩', '2018-12-03 09:29:05', 'tableware'),
(16, '../picture/thunder.jpeg', '../static/sound/nature/thunder1.mp3', '自然', '打雷', '100~1000', '低頻高', '2018-12-05 08:15:50', 'thunder'),
(13, '../picture/streamwater.jpg', '../static/sound/nature/溪水.wav', '自然', '溪水聲', '100~1000', '平緩', '2018-12-05 08:03:11', 'streamwater'),
(14, '../picture/helicopter.jpg', '../static/sound/military/直升飛機盤旋.mp3', '軍事', '直升機盤旋', '<100;100~1000', '低頻高', '2018-12-06 01:37:10', 'helicopter'),
(50, '../picture/gunshot.jpeg', '../static/sound/military/開槍.mp3', '軍事', '開槍', '<100', '低頻高', '2018-12-06 03:19:17', 'military battle'),
(17, '../picture/walk.jpg', '../static/sound/street/走路.wav', '街道', '走路', '100~1000', '中間高，兩邊低', '2018-12-05 08:12:36', 'walk'),
(18, '../picture/clap.jpg', '../static/sound/event/鼓掌聲.wav', '活動', '鼓掌聲', '1000~2000', '中間高，兩邊低', '2018-12-05 08:19:32', 'clap'),
(19, '../picture/guitar.jpeg', '../static/sound/instrument/guitar.mp3', '樂器', '吉他', '100~1000', '低頻高', '2018-12-05 08:22:55', 'guitar'),
(52, '../picture/dryer1.png', '../static/sound/dailylife/S6021- 02大吹風機.mp3', '日常生活', '吹風機', '100~1000', '平緩', '2018-12-06 03:25:56', ' Big hair dryer'),
(21, '../picture/toilet.jpg', '../static/sound/dailylife/S6021- 57廁所馬桶.mp3', '日常生活', '馬桶', '100~1000', '低頻高', '2018-12-05 08:39:56', 'toilet'),
(22, '../picture/brooms.jpg', '../static/sound/house/brooming1.mp3', '房子', '掃地', '<100', '低頻高', '2018-12-05 16:52:42', 'brooms'),
(23, '../picture/brush teeth.jpg', '../static/sound/house/brushing_teeth.mp3', '房子', '刷牙', '<100', '中間低，兩邊高', '2018-12-05 17:32:34', 'brush teeth'),
(24, '../picture/coins.jpg', '../static/sound/house/coins.mp3', '房子', '錢幣', '>7000', '高頻高', '2018-12-05 17:32:51', 'coins'),
(25, '../picture/geese.jpg', '../static/sound/animal/B geese.wav', '動物', '鵝', '100~1000', '高頻高', '2018-12-05 17:10:46', 'geese'),
(26, '../picture/rain.jpg', '../static/sound/nature/下雨聲,大雨聲.wav', '自然', '下雨', '<100', '平緩', '2018-12-06 01:38:04', 'rain'),
(27, '../picture/fire.jpg', '../static/sound/nature/fire1.mp3', '自然', '火', '<100', '低頻高', '2018-12-05 17:17:02', 'fire'),
(51, '../picture/summerbeach.jpg', '../static/sound/nature/summer_beach1.mp3', '自然', '夏天的海灘', '100~1000', '中間低，兩邊高', '2018-12-06 03:30:34', 'summer beach'),
(29, '../picture/blow_balloon.jpg', '../static/sound/event/吹氣球.mp3', '活動', '吹氣球', '2000~4000', '平緩', '2018-12-05 17:24:51', 'blow balloon'),
(30, '../picture/hammer.jpg', '../static/sound/dailylife/S6012-鐵槌 敲東西 小的釘子.mp3', '日常生活', '鐵鎚敲東西', '100~1000', '平緩', '2018-12-05 17:28:32', 'hammer'),
(31, '../picture/badminton.jpg', '../static/sound/school/badminton2.mp3', '學校', '羽毛球', '<100', '低頻高', '2018-12-06 00:53:45', 'badminton'),
(32, '../picture/fire truck.jpg', '../static/sound/street/S6015- 54消防車警報器.mp3', '街道', '消防車警報聲', '1000~2000', '中間高，兩邊低', '2018-12-06 01:01:33', 'fire truck'),
(33, '../picture/bicycle_bell.jpeg', '../static/sound/street/腳踏車鈴鐺.wav', '街道', '腳踏車鈴鐺', '2000~7000;>7000', '高頻高', '2018-12-06 01:37:25', 'bicycle bell'),
(34, '../picture/turn signal.jpg', '../static/sound/street/汽車方向燈.mp3', '街道', '汽車方向燈', '100~1000', '高頻高', '2018-12-06 01:13:09', 'turn signal'),
(55, '../picture/car.jpg', '../static/sound/street/汽車喇叭.mp3', '街道', '汽車喇叭', '100~1000;1000~2000', '高頻高', '2018-12-06 03:53:46', 'car horn'),
(39, '../picture/paperburn.jpg', '../static/sound/dailylife/S6015-紙張的燃燒在爐子內.mp3', '日常生活', '紙張燃燒', '<100', '低頻高', '2018-12-06 02:24:18', 'paper_burn'),
(36, '../picture/church_bell.jpeg', '../static/sound/street/10-23 Church Bell1.mp3', '街道', '教堂鐘聲', '100~1000', '中間高，兩邊低', '2018-12-06 01:27:59', 'church bell'),
(37, '../picture/piano.jpeg', '../static/sound/instrument/piano.mp3', '樂器', '鋼琴', '1000~2000', '中間高，兩邊低', '2018-12-06 01:39:11', 'piano'),
(38, '../picture/drum.jpeg', '../static/sound/instrument/bass_drum.mp3', '樂器', '低音鼓', '<100', '低頻高', '2018-12-06 01:42:08', 'bass_drum'),
(40, '../picture/vacuum_cleaner.jpeg', '../static/sound/dailylife/S6021- 63吸塵器2.mp3', '日常生活', '吸塵器', '100~1000', '低頻高', '2018-12-06 02:45:21', 'vacuum cleaner'),
(41, '../picture/alarm_clock_bed.jpg', '../static/sound/dailylife/S6020- 37大鬧鐘鈴聲.mp3', '日常生活', '鬧鐘', '>7000', '高頻高', '2018-12-06 02:35:36', 'alarm clock'),
(11, '../picture/toaster.jpg', '../static/sound/house/烤麵包機.mp3', '房子', '烤麵包機', '100~1000', '平緩', '2018-12-06 03:57:20', 'toaster'),
(2, '../picture/letter box.jpeg', '../static/sound/house/letter_box.mp3', '房子', '信箱', '100~1000', '中間高，兩邊低', '2018-12-06 03:55:08', 'letter box'),
(44, '../picture/scissors.png', '../static/sound/house/scissors2.mp3', '房子', '剪刀', '>7000', '高頻高', '2018-12-06 02:56:16', 'scissor'),
(45, '../picture/fan.jpg', '../static/sound/house/fan1.mp3', '房子', '電風扇', '<100', '低頻高', '2018-12-06 02:58:28', 'fan'),
(46, '../picture/wooden_door.jpg', '../static/sound/house/knocking_a_wooden_door1.mp3', '房子', '敲木門', '<100', '低頻高', '2018-12-06 03:02:18', 'knock_wooden_door'),
(47, '../picture/alarm_bell.jpeg', '../static/sound/school/Alarm Bell.mp3', '學校', '警報聲', '4000~7000', '高頻高', '2018-12-06 03:10:18', 'alarm bell'),
(35, '../picture/school_chime.jpeg', '../static/sound/school/school_chime.mp3', '學校', '學校鐘聲', '100~1000', '中間高，兩邊低', '2018-12-06 03:52:45', 'school_chime'),
(53, '../picture/lion.jpeg', '../static/sound/animal/B lion.wav', '動物', '獅子', '100~1000', '中間低，兩邊高', '2018-12-06 03:51:30', 'lion'),
(15, '../picture/rat.jpeg', '../static/sound/animal/B rat.wav', '動物', '老鼠', '4000~7000', '中間高，兩邊低', '2018-12-06 03:20:41', 'rat'),
(5, '../picture/dolphin.jpeg', '../static/sound/animal/59 Dolphins Singing1.mp3', '動物', '海豚', '2000~4000', '平緩', '2018-12-06 03:29:48', 'dolphin'),
(20, '../picture/horse.jpeg', '../static/sound/animal/B horse.wav', '動物', '馬蹄', '1000~2000', '中間高，兩邊低', '2018-12-06 03:28:13', 'horse'),
(28, '../picture/wash dishes.jpg', '../static/sound/cook/wash_dishes.mp3', '廚房、餐廳', '洗碗', '<100', '低頻高', '2018-12-06 03:37:49', 'wash dishes'),
(54, '../picture/strong_wind.jpeg', '../static/sound/nature/strong_wind1.mp3', '自然', '強風', '<100', '低頻高', '2018-12-06 03:42:00', 'strong wind'),
(48, '../picture/cricket.jpg', '../static/sound/nature/cricket.mp3', '自然;動物', '蟋蟀', '2000~4000', '中間高', '2018-12-06 03:53:36', 'cricket'),
(56, '../picture/aircraft.jpeg', '../static/sound/military/Airplane.mp3', '軍事', '飛機', '100~1000', '平緩', '2018-12-06 04:02:22', 'aircraft'),
(57, '../picture/ice cube.jpeg', '../static/sound/nature/small_ice1.mp3', '自然', '冰塊', '1000~2000', '高頻高', '2018-12-06 04:43:44', 'ice_cube'),
(58, '../picture/wind_chimes.jpg', '../static/sound/nature/wind_bell.mp3', '自然;日常生活', '風鈴', '4000~7000', '高頻高', '2018-12-06 04:50:10', 'wind chimes'),
(59, '../picture/frog.jpg', '../static/sound/nature/frogs_loop.mp3', '自然;動物', '青蛙', '2000~4000', '中間高，兩邊低', '2018-12-06 04:54:27', 'frog'),
(60, '../picture/Taiwan_Alisan_Train.jpg', '../static/sound/street/trains_passing1.mp3', '街道', '火車經過', '100~1000', '平緩', '2018-12-06 04:59:51', 'train_pass'),
(61, '../picture/pc_keyboard.jpg', '../static/sound/house/pc_keyboard.mp3', '房子;日常生活', '電腦鍵盤', '<100', '低頻高', '2018-12-06 13:04:05', 'pc_keyboard'),
(62, '../picture/newspaper.jpg', '../static/sound/house/newspaper.mp3', '房子;日常生活', '看報紙', '1000~2000', '中間低，兩邊高', '2018-12-06 13:06:56', 'newspaper'),
(63, '../picture/shower.jpg', '../static/sound/house/shower.mp3', '房子', '淋浴', '<100', '中間低，兩邊高', '2018-12-06 13:10:05', 'shower'),
(64, '../picture/tap.jpeg', '../static/sound/house/tap1.mp3', '房子', '水龍頭', '4000~7000', '中間低，兩邊高', '2018-12-06 13:12:48', 'tap'),
(65, '../picture/towel.jpeg', '../static/sound/house/towel.mp3', '房子', '毛巾', '<100', '低頻高', '2018-12-06 13:16:00', 'towel'),
(66, '../picture/washhand.jpeg', '../static/sound/house/washstand.mp3', '房子', '洗手', '>7000', '平緩', '2018-12-06 13:23:18', 'wash hand'),
(67, '../picture/zipper.jpg', '../static/sound/dailylife/zipper2.mp3', '日常生活', '拉鍊', '<100', '中間高，兩邊低', '2018-12-06 13:27:54', 'zipper'),
(68, '../picture/plastic_bag.jpg', '../static/sound/dailylife/揉塑膠袋.mp3', '日常生活', '揉塑膠袋', '1000~2000;2000~4000', '高頻高', '2018-12-06 13:39:29', 'plastic_bag'),
(69, '../picture/camera.jpg', '../static/sound/dailylife/10-45 Cameras.mp3', '日常生活', '相機', '1000~2000', '高頻高', '2018-12-06 13:45:20', 'camera'),
(70, '../picture/bubbles_underwater.jpeg', '../static/sound/dailylife/10-37 Bubbles Underwater.mp3', '日常生活', '在水中的泡泡', '100~1000', '低頻高', '2018-12-06 13:48:38', 'bubbles_underwater'),
(71, '../picture/firework.jpeg', '../static/sound/event/firework2.mp3', '活動', '煙火', '<100;100~1000', '低頻高', '2018-12-06 13:52:11', 'firework'),
(72, '../picture/ambulance.png', '../static/sound/street/ambulance_passing.mp3', '街道', '救護車經過', '100~1000', '中間高，兩邊低', '2018-12-06 13:57:43', 'ambulance_passing'),
(73, '../picture/truck.jpg', '../static/sound/street/trucks4.mp3', '街道', '卡車', '<100', '平緩', '2018-12-06 14:19:51', 'truck'),
(81, '../picture/brown_tree_frog.jpg', '../static/sound/floridatreefrog.wav', '動物', '樹蛙', '1000~2000', '中間高，兩邊低', '2019-12-05 14:03:26', 'treeforg'),
(82, '../picture/櫃子@2x.png', '../static/sound/kitchen-cabinet.wav', '房子', '木櫃子', '100~1000', '低頻高', '2019-12-05 14:19:05', 'woodcabinet'),
(83, '../picture/果汁機2@2x.png', '../static/sound/460170giddsterjuicer-at-work.wav', '廚房、餐廳', '果汁機', '100~1000', '平緩', '2019-12-05 15:10:11', 'juicer'),
(84, '../picture/山羊@2x.png', '../static/sound/196671__soundmary__sheep-in-field (mp3cut.net).mp3', '動物', '羊', '2000~4000', '中間高，兩邊低', '2019-12-05 15:19:15', 'sheep'),
(85, '../picture/牛.png', '../static/sound/408783__tats14__cow-noise.wav', '動物', '牛', '100~1000', '平緩', '2019-12-05 15:24:57', 'cow');

-- --------------------------------------------------------

--
-- 資料表結構 `enviro`
--

CREATE TABLE `enviro` (
  `id` int(11) NOT NULL,
  `background_src` text CHARACTER SET utf8 NOT NULL,
  `category` text CHARACTER SET utf8 NOT NULL,
  `name` varchar(10) CHARACTER SET utf8 NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `object` varchar(50) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 傾印資料表的資料 `enviro`
--

INSERT INTO `enviro` (`id`, `background_src`, `category`, `name`, `created_time`, `object`) VALUES
(1, '../static/images/enviro/background/kitchen.jpg', '廚房、餐廳', '廚房', '2019-12-05 15:14:01', '1,2,19,20,22,23,37,40,42,43'),
(18, '../static/images/enviro/background/1762.jpg', '房子', '浴室', '2019-12-05 14:20:22', '21,33,34,35,41'),
(20, '../static/images/enviro/background/純背景@4x.png', '動物', '草原動物', '2019-12-05 15:25:40', '24,26,27,28,29,32,39,44,45');

-- --------------------------------------------------------

--
-- 資料表結構 `envirohistory`
--

CREATE TABLE `envirohistory` (
  `id` int(11) NOT NULL,
  `name` text CHARACTER SET utf8 NOT NULL,
  `data` text CHARACTER SET utf8 NOT NULL,
  `correct` float NOT NULL,
  `time` float NOT NULL,
  `enviroid` int(11) NOT NULL,
  `mode` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 傾印資料表的資料 `envirohistory`
--

INSERT INTO `envirohistory` (`id`, `name`, `data`, `correct`, `time`, `enviroid`, `mode`) VALUES
(1, '影片', '烤麵包機/烤麵包機/5.124;放瓶子/放瓶子/11.403', 100, 8.264, 1, 1),
(2, '影片', '切菜/切菜/3.848;烤麵包機/烤麵包機/2.830', 100, 3.339, 1, 1),
(3, '111', '洗碗/洗碗/2.791;沸水/沸水/2.62;烤麵包機/烤麵包機/1.743;切菜/洗碗/2.2;放瓶子/放瓶子/2.168', 80, 2.304, 1, 1),
(4, '影片', '烤麵包機/烤麵包機/2.838;洗碗/洗碗/2.618;沸水/沸水/2.365;放瓶子/放瓶子/3.633;切菜/切菜/2.417', 100, 2.774, 1, 1),
(5, '影片', '放瓶子/放瓶子/3.394;烤麵包機/烤麵包機/3.407', 100, 3.401, 1, 1),
(6, '王同學', '洗碗/烤麵包機/16.940;沸水/沸水/23.122;切菜/切菜/5.211;放瓶子/放瓶子/7.681;烤麵包機/烤麵包機/8.68', 80, 12.327, 1, 1),
(7, '許浡華', '放瓶子/放瓶子/4.784;烤麵包機/烤麵包機/2.24;切菜/洗碗/1.709;洗碗/洗碗/1.985;沸水/切菜/2.622', 60, 2.668, 1, 2),
(8, 'jack', '烤麵包機/烤麵包機/33.454;洗碗/洗碗/15.280;切菜/切菜/5.6;放瓶子/放瓶子/4.175;沸水/沸水/8.47', 100, 13.396, 1, 1),
(9, '王二竹', '切菜/切菜/10.34;放瓶子/沸水/12.252;洗碗/洗碗/11.950;沸水/沸水/11.486;烤麵包機/烤麵包機/8.158', 80, 10.837, 1, 1),
(10, '吳介', '沸水/沸水/15.708;掃地/烤麵包機/21.434;烤麵包機/烤麵包機/8.998;電風扇/電風扇/12.279;洗碗/洗碗/9.637', 80, 13.611, 1, 1),
(11, '陳均', '放瓶子/放瓶子/14.132;掃地/掃地/8.522;洗碗/洗碗/6.762;烤麵包機/烤麵包機/4.426;電風扇/電風扇/5.859', 100, 7.94, 1, 1),
(12, '楊宇', '放瓶子/洗碗/22.278;烤麵包機/烤麵包機/3.251;電風扇/電風扇/9.767;掃地/洗碗/5.733;切菜/切菜/26.812', 60, 13.568, 1, 1),
(13, '吳佳恩', '掃地/掃地/4.734;放瓶子/放瓶子/19.311;電風扇/電風扇/13.638;沸水/沸水/4.37;切菜/切菜/3.341', 100, 9.079, 1, 1),
(14, '王藝名', '烤麵包機/烤麵包機/13.387;切菜/切菜/8.21;洗碗/洗碗/3.448;放瓶子/放瓶子/2.896;電風扇/電風扇/6.903', 100, 6.969, 1, 1),
(15, '王藝名', '洗碗/洗碗/2.784;電風扇/電風扇/6.24;沸水/沸水/4.693;掃地/掃地/2.258;切菜/切菜/2.653', 100, 3.726, 1, 1),
(16, '陳科任', '烤麵包機/烤麵包機/10.185;沸水/沸水/4.580;掃地/掃地/2.89;切菜/切菜/9.784;電風扇/電風扇/25.6', 100, 10.608, 1, 1),
(17, '陳科任', '水龍頭/水龍頭/5.616;馬桶/馬桶/3.346;刷牙/刷牙/2.242;毛巾/毛巾/4.683;/毛巾/', 80, 3.177, 18, 1),
(18, '花', '洗碗/洗碗/5.185;放瓶子/放瓶子/5.628;沸水/沸水/4.739;切菜/切菜/3.436;掃地/掃地/3.399', 100, 4.477, 1, 1),
(19, '花', '沸水/沸水/3.543;掃地/掃地/2.293;電風扇/電風扇/3.442;切菜/切菜/3.261;烤麵包機/烤麵包機/6.563', 100, 3.82, 1, 1),
(20, 'Evan', '切菜/切菜/9.710;放瓶子/沸水/19.626;烤麵包機/烤麵包機/12.100;洗碗/洗碗/4.570;沸水/沸水/8.617', 80, 10.925, 1, 1),
(21, '陳奕穎', '切菜/切菜/33.317;電風扇/烤麵包機/32.264;沸水/洗碗/14.62;烤麵包機/電風扇/28.260;洗碗/沸水/8.887', 20, 23.47, 1, 1),
(22, '影片', '電風扇/烤麵包機/4.575;洗碗/洗碗/6.671;掃地/掃地/2.483;沸水/切菜/5.2;烤麵包機/烤麵包機/2.733', 60, 4.332, 1, 2),
(23, '影片', '沸水/沸水/2.535;放瓶子/洗碗/2.622;烤麵包機/烤麵包機/2.710;切菜/切菜/3.250;掃地/掃地/3.187', 80, 2.861, 1, 1),
(24, 'RIYA', '放瓶子/切菜/21.50;洗碗/洗碗/4.188;吸塵器/果汁機/8.643;切菜/洗碗/6.58;掃地/掃地/19.492', 40, 12.081, 1, 1),
(25, 'RIYA', '剪刀/剪刀/4.292;放瓶子/沸水/22.192;吸塵器/果汁機/4.300;烤麵包機/烤麵包機/5.769;電風扇/吸塵器/15.201', 40, 10.351, 1, 1),
(26, '111', '電風扇/吸塵器/21.617;吸塵器/果汁機/19.999;沸水/沸水/10.698;放瓶子/放瓶子/15.879;洗碗/洗碗/2.866', 60, 14.212, 1, 1),
(27, 'JW', '沸水/沸水/3.420;切菜/切菜/2.396;剪刀/剪刀/5.197;掃地/掃地/2.535;果汁機/吸塵器/3.677;放瓶子/放瓶子/3.84;吸塵器/吸塵器/4.757;洗碗/洗碗/2.389;電風扇/電風扇/4.207;烤麵包機/烤麵包機/3.45', 90, 3.587, 1, 1),
(28, '111', '果汁機/吸塵器/43.427;洗碗/洗碗/7.692;沸水/沸水/7.348;吸塵器/吸塵器/6.924;切菜/洗碗/10.797', 60, 15.238, 1, 1),
(29, '訪客', '剪刀/電風扇/8.989;切菜/掃地/12.213', 0, 10.601, 1, 2),
(30, '訪客', '沸水/沸水/29.453;洗碗/洗碗/2.166', 100, 15.81, 1, 2),
(31, 'JW', '切菜/電風扇/53.351;剪刀/剪刀/37.182;電風扇/電風扇/5.98;洗碗/洗碗/2.213;果汁機/果汁機/4.846', 80, 20.714, 1, 1),
(32, '訪客', '果汁機/果汁機/12.174;掃地/掃地/5.830;洗碗/洗碗/4.28;放瓶子/放瓶子/3.23;烤麵包機/烤麵包機/3.199;剪刀/剪刀/2.597;吸塵器/吸塵器/2.797;沸水/沸水/3.145;電風扇/電風扇/5.181;切菜/切菜/5.287', 100, 4.772, 1, 1),
(33, '建霖', '果汁機/果汁機/18.325;烤麵包機/烤麵包機/4.502;電風扇/吸塵器/28.636;吸塵器/吸塵器/39.532;剪刀/剪刀/2.268;放瓶子/放瓶子/4.730;掃地/掃地/3.476;沸水/沸水/2.719;切菜/切菜/3.379;洗碗/洗碗/2.530', 90, 11.01, 1, 1),
(34, '建霖', '木櫃子/木櫃子/4.213;水龍頭/水龍頭/11.839;刷牙/刷牙/3.125;馬桶/馬桶/2.638;毛巾/毛巾/1.884', 100, 4.74, 18, 1),
(35, '建霖', '烏鴉/烏鴉/2.563;貓/貓/2.635;羊/羊/4.440;貓頭鷹/貓頭鷹/2.125;牛/牛/2.942;老鼠/老鼠/2.634;樹蛙/樹蛙/1.979;獅子/獅子/1.611;狗吠/獅子/1.431', 89, 2.484, 20, 1),
(36, '5', '放瓶子/放瓶子/5.339;剪刀/剪刀/3.17;沸水/沸水/2.122;洗碗/洗碗/2.682;電風扇/電風扇/4.361', 100, 3.535, 1, 1),
(37, 'fin', '剪刀/掃地/2.722;果汁機/果汁機/5.614;切菜/洗碗/9.620;電風扇/電風扇/5.875;沸水/沸水/16.53', 60, 8.072, 1, 2),
(38, 'fin', '剪刀/掃地/2.722;果汁機/果汁機/5.614;切菜/洗碗/9.620;電風扇/電風扇/5.875;沸水/沸水/16.53', 60, 8.072, 1, 2),
(39, '訪客', '刷牙/木櫃子/;毛巾/馬桶/12.954;木櫃子/木櫃子/8.78;水龍頭/毛巾/;馬桶/馬桶/', 40, 4.347, 18, 2),
(40, '訪客', '沸水/放瓶子/', 0, 0, 1, 1),
(41, '訪客', '吸塵器/吸塵器/4.993', 100, 4.993, 1, 1),
(42, '訪客', '掃地/掃地/14.531;果汁機/烤麵包機/;沸水/洗碗/;洗碗/沸水/;吸塵器/剪刀/', 20, 2.906, 1, 1),
(43, '訪客', '掃地/掃地/5.798;吸塵器/洗碗/', 50, 2.899, 1, 1),
(44, '訪客', '吸塵器/吸塵器/2.778', 100, 2.778, 1, 1),
(45, '訪客', '沸水/洗碗/4.941;烤麵包機/烤麵包機/4.102;洗碗/洗碗/4.815', 67, 4.619, 1, 1),
(46, '訪客', '電風扇/電風扇/4.315;掃地/沸水/', 50, 2.158, 1, 2),
(47, '訪客', '電風扇/電風扇/4.315;掃地/沸水/', 50, 2.158, 1, 2),
(48, '訪客', '吸塵器/烤麵包機/1.113;剪刀/烤麵包機/', 0, 0.557, 1, 2),
(49, '訪客', '烤麵包機/沸水/2.163;剪刀/掃地/1.299;洗碗/放瓶子/1.672', 0, 1.711, 1, 2),
(50, '訪客', '馬桶/馬桶/28.126;水龍頭/刷牙/13.212', 50, 20.669, 18, 1),
(51, '訪客', '掃地/烤麵包機/;切菜/沸水/', 0, 0, 1, 2),
(52, '2232', '獅子/獅子/;貓頭鷹/貓頭鷹/', 100, 0, 20, 2),
(53, '2232', '切菜/烤麵包機/3.128;洗碗/沸水/;沸水/沸水/;電風扇/烤麵包機/;果汁機/掃地/', 20, 0.626, 1, 2);

-- --------------------------------------------------------

--
-- 資料表結構 `exam`
--

CREATE TABLE `exam` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `question` varchar(50) NOT NULL,
  `creator` varchar(30) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT current_timestamp(),
  `recent_edit_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `exam`
--

INSERT INTO `exam` (`id`, `name`, `question`, `creator`, `create_time`, `recent_edit_time`) VALUES
(1, '測試1', '1,2,3,5,6', 'Ian', '2018-08-28 20:16:00', '2018-09-03 15:02:50'),
(2, '測試', '2,3,4,8,11,12', 'Ian', '2018-08-29 03:21:37', '2018-08-30 14:18:04'),
(7, 'owowow', '4,5,9,11', 'Ian', '2018-08-29 16:53:03', '2018-08-29 16:53:13'),
(19, '111', '1,3,8', 'ttt', '2018-12-04 22:45:57', '2018-12-04 22:46:16'),
(22, 'Try', '13,14,15,17,18,19,20,21', 'Kelly', '2018-12-05 16:53:35', '2018-12-05 16:53:35'),
(23, '測試2', '52,23,51,33,36,41,47,54,56,61,70', '222', '2018-12-07 08:50:30', '2018-12-07 08:50:30'),
(24, '測試3', '22,29,32,39,28,67', '333', '2018-12-07 08:52:11', '2018-12-07 08:52:11'),
(25, '測試4', '16,13,14,25,59', '444', '2018-12-07 08:52:56', '2018-12-07 08:52:56'),
(26, '測試5', '8,9,13,26,51,28,63,70', '555', '2018-12-07 10:06:31', '2018-12-07 10:06:31');

-- --------------------------------------------------------

--
-- 資料表結構 `game`
--

CREATE TABLE `game` (
  `account` varchar(12) NOT NULL,
  `money` int(11) NOT NULL DEFAULT 0,
  `mission` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT '[]',
  `entity` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[]'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `game`
--

INSERT INTO `game` (`account`, `money`, `mission`, `entity`) VALUES
('acs107123', 0, '[]', '[]'),
('test0001', 0, '[]', '[]'),
('test002', 0, '[{\"id\":\"1\",\"time\":\"2020-11-5 14:56:58\"},{\"id\":\"2\",\"time\":\"2020-10-13 20:22:10\"},{\"id\":\"7\",\"time\":\"2020-10-15 14:44:29\"}]', '\"\"'),
('test666', 0, '[]', '[]');

-- --------------------------------------------------------

--
-- 資料表結構 `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `data` text NOT NULL,
  `correct` float NOT NULL,
  `time` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `history`
--

INSERT INTO `history` (`id`, `name`, `data`, `correct`, `time`) VALUES
(1, 'Ian', '貓/狗吠/3.353;烏鴉/烏鴉/3.213', 50, 3.283),
(33, 'helloooo', '哨子/鐵置門/6.357;狗吠/炒菜/4.591;切菜/鐵置門/2.562;貓/貓/2.86;鐵置門/喝水/2.364', 20, 3.747),
(3, 'Ian', '貓/貓/3.333', 100, 3.333),
(4, 'qqq', '烏鴉/烏鴉/3.771', 100, 3.771),
(5, 'qqq', '貓/貓/2.565;哨子/切菜/2.843;擺盤/擺盤/3.481', 67, 2.963),
(6, 'qqq', '狗吠/哨子/2.709;貓頭鷹/貓頭鷹/2.925;炒菜/炒菜/4.100', 67, 3.245),
(7, 'qqq', '放瓶子/貓/8.435;貓頭鷹/貓頭鷹/3.49;哨子/哨子/2.804', 67, 4.91),
(8, 'qqq', '喝水/貓頭鷹/2.814;哨子/哨子/2.887;鐵置門/鐵置門/2.564', 67, 2.755),
(9, 'qqq', '貓/貓/3.175;擺盤/擺盤/4.498;鐵置門/鐵置門/3.92', 100, 3.864),
(10, 'qqq', '切菜/切菜/3.928;擺盤/擺盤/3.846;鐵置門/鐵置門/3.852', 100, 3.875),
(11, 'qqq', '哨子/哨子/3.320;狗吠/狗吠/3.577;貓頭鷹/貓頭鷹/5.26', 100, 4.052),
(12, '訪客', '狗吠/狗吠/3.034', 100, 3.034),
(13, '訪客', '貓/狗吠/4.590;鐵置門/鐵置門/3.939;狗吠/狗吠/3.539;切菜/鐵置門/3.695;哨子/哨子/3.5', 60, 3.853),
(14, '訪客', '鐵置門/鐵置門/3.771;狗吠/放瓶子/4.337;貓/貓/8.602;切菜/切菜/2.739;哨子/哨子/2.110', 80, 4.312),
(15, '訪客', '炒菜/炒菜/4.757;烏鴉/烏鴉/4.864;喝水/擺盤/7.137;狗吠/炒菜/4.758', 50, 5.379),
(16, '訪客', '擺盤/擺盤/3.427;貓/切菜/2.316;炒菜/炒菜/7.101;哨子/哨子/2.964;烏鴉/放瓶子/4.447;沸水/沸水/3.915', 67, 4.028),
(17, '大學同學二十一歲', '烏鴉/烏鴉/6.923;狗吠/狗吠/7.20;喝水/喝水/6.937;炒菜/炒菜/6.798', 100, 6.965),
(18, '大學同學二十一歲', '哨子/哨子/5.595;沸水/沸水/7.559;貓/貓/6.677', 100, 6.61),
(22, '測試1', '貓/貓/4.50;貓頭鷹/貓/4.107;貓頭鷹/貓頭鷹/2.877;擺盤/擺盤/3.763;狗吠/狗吠/5.899;放瓶子/放瓶子/4.333;切菜/切菜/3.761;鐵置門/鐵置門/3.830;沸水/鐵置門/3.874;沸水/沸水/4.698;喝水/喝水/6.636;炒菜/炒菜/3.412', 83, 4.308),
(23, '訪客', '哨子/烏鴉/4.565;炒菜/炒菜/3.497;貓/貓/4.955;沸水/沸水/2.989;烏鴉/烏鴉/3.787;擺盤/擺盤/4.995', 83, 4.131),
(24, '訪客', '哨子/烏鴉/4.565;炒菜/炒菜/3.497;貓/貓/4.955;沸水/沸水/2.989;烏鴉/烏鴉/3.787;擺盤/擺盤/4.995', 83, 4.255),
(25, '酷哥', '沸水/沸水/16.736;放瓶子/沸水/6.710;擺盤/擺盤/7.81;貓頭鷹/貓頭鷹/1.557;貓//5.789', 60, 7.72),
(26, '測試', '放瓶子/放瓶子/6.615;擺盤/擺盤/3.328;沸水/沸水/2.857;鐵置門/鐵置門/2.320;烏鴉/烏鴉/3.378;切菜/切菜/3.97;狗吠/狗吠/4.198;哨子/哨子/2.751;喝水/喝水/5.431;貓/貓/3.195', 100, 3.804),
(27, '測試', '放瓶子/放瓶子/17.672', 100, 17.672),
(28, '測試', '炒菜/炒菜/5.673;哨子/哨子/20.868', 100, 13.271),
(29, '測試', '貓頭鷹/貓頭鷹/17.949;狗吠/狗吠/3.113', 100, 10.531),
(30, '訪客', '哨子/哨子/4.218;鐵置門/鐵置門/4.655', 100, 4.437),
(31, '訪客', '鐵置門/鐵置門/2.888;貓/貓/2.777;哨子/哨子/3.364', 100, 3.01),
(32, '訪客', '炒菜/炒菜/3.627', 100, 3.627),
(34, 'Ian', '烏鴉/烏鴉/3.828;直升機盤旋/直升機盤旋/4.601;馬桶/馬桶/3.132', 100, 3.854),
(35, '訪客', '掃地/掃地/4.498;夏天的海灘/夏天的海灘/9.419;吹氣球/吹氣球/7.916;貓頭鷹/貓頭鷹/5.303;哨子/哨子/10.542', 100, 7.536),
(36, 'helloooo', '消防車警報聲/消防車警報聲/6.133;刷牙/刷牙/2.904;拉鍊/拉鍊/2.486;鼓掌聲/馬桶/3.381;喝水/喝水/3.206;吹風機/吹風機/4.75;蟋蟀/蟋蟀/3.29;鐵鎚敲東西/強風/6.868;卡車/卡車/3.766;開槍/開槍/2.290', 80, 3.907),
(37, '訪客', '消防車警報聲/消防車警報聲/12.523;洗碗/洗碗/23.185;紙張燃燒/紙張燃燒/9.155;吹氣球/打雷/11.501;掃地/掃地/4.334;拉鍊/拉鍊/8.369', 83, 11.511),
(38, '訪客', '夏天的海灘/夏天的海灘/14.94;洗碗/洗碗/10.292;羽毛球/羽毛球/7.114;強風/強風/7.270;電腦鍵盤/電腦鍵盤/4.290;教堂鐘聲/教堂鐘聲/5.627;烤麵包機/烤麵包機/4.557;蟋蟀/蟋蟀/4.774;吹氣球/吹氣球/5.643;信箱/信箱/6.361', 100, 7.087),
(39, '訪客', '哨子/哨子/8.2;烤麵包機/烤麵包機/6.355;煙火/卡車/4.277;馬桶/馬桶/4.763;鐵鎚敲東西/鐵鎚敲東西/13.499;吹風機/吹風機/6.662', 83, 7.293),
(40, 'jj', '馬蹄/馬蹄/6.964;羽毛球/擺盤/6.683;強風/強風/7.166', 67, 6.938),
(41, '', '警報聲/警報聲/9.231;蟋蟀/蟋蟀/6.276;煙火/煙火/6.653;獅子/老鼠/23.629;海豚/海豚/22.858', 80, 13.729),
(42, '', '吹氣球/吹氣球/10.212;飛機/鬧鐘/4.836;拉鍊/拉鍊/1.993', 67, 5.68),
(43, 'll', '教堂鐘聲/教堂鐘聲/9.844;羽毛球/鋼琴/7.275;揉塑膠袋/揉塑膠袋/3.366', 67, 6.828),
(44, '訪客', '洗碗/洗碗/5.106;消防車警報聲/消防車警報聲/3.154;紙張燃燒/紙張燃燒/3.279;掃地/洗手/4.789;拉鍊/拉鍊/2.933;吹氣球/吹氣球/4.643', 83, 3.984);

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
('ACS106106', '{\"train\":[{\"items\":[{\"enviro\":\"草原動物\",\"id\":\"24\",\"object_name\":\"貓\",\"time\":\"2020-11-18 23:37:34\"},{\"enviro\":\"草原動物\",\"id\":\"29\",\"object_name\":\"獅子\",\"time\":\"2020-11-18 23:37:54\"},{\"enviro\":\"草原動物\",\"id\":\"27\",\"object_name\":\"狗\",\"time\":\"2020-11-18 23:38:6\"},{\"enviro\":\"草原動物\",\"id\":\"32\",\"object_name\":\"老鼠\",\"time\":\"2020-11-18 23:38:19\"},{\"enviro\":\"草原動物\",\"id\":\"24\",\"object_name\":\"貓\",\"time\":\"2020-11-18 23:38:25\"},{\"enviro\":\"草原動物\",\"id\":\"39\",\"object_name\":\"樹蛙\",\"time\":\"2020-11-18 23:38:34\"},{\"enviro\":\"草原動物\",\"id\":\"26\",\"object_name\":\"烏鴉\",\"time\":\"2020-11-18 23:38:38\"},{\"enviro\":\"草原動物\",\"id\":\"44\",\"object_name\":\"山羊\",\"time\":\"2020-11-18 23:38:44\"},{\"enviro\":\"草原動物\",\"id\":\"45\",\"object_name\":\"牛\",\"time\":\"2020-11-18 23:39:1\"}],\"time\":\"2020-11-18 23:37:19\",\"enviro\":\"20\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"23\",\"object_name\":\"掃地\",\"time\":\"2020-11-18 23:39:19\"},{\"enviro\":\"廚房\",\"id\":\"20\",\"object_name\":\"烤麵包機\",\"time\":\"2020-11-18 23:39:26\"},{\"enviro\":\"廚房\",\"id\":\"19\",\"object_name\":\"洗碗\",\"time\":\"2020-11-18 23:39:42\"},{\"enviro\":\"廚房\",\"id\":\"2\",\"object_name\":\"沸水\",\"time\":\"2020-11-18 23:40:6\"},{\"enviro\":\"廚房\",\"id\":\"42\",\"object_name\":\"果汁機\",\"time\":\"2020-11-18 23:40:15\"},{\"enviro\":\"廚房\",\"id\":\"22\",\"object_name\":\"瓶子\",\"time\":\"2020-11-18 23:40:19\"},{\"enviro\":\"廚房\",\"id\":\"43\",\"object_name\":\"剪刀\",\"time\":\"2020-11-18 23:40:23\"},{\"enviro\":\"廚房\",\"id\":\"43\",\"object_name\":\"剪刀\",\"time\":\"2020-11-18 23:40:27\"},{\"enviro\":\"廚房\",\"id\":\"43\",\"object_name\":\"剪刀\",\"time\":\"2020-11-18 23:40:35\"},{\"enviro\":\"廚房\",\"id\":\"43\",\"object_name\":\"剪刀\",\"time\":\"2020-11-18 23:40:37\"}],\"time\":\"2020-11-18 23:39:11\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"浴室\",\"id\":\"35\",\"object_name\":\"馬桶\",\"time\":\"2020-11-18 23:41:0\"},{\"enviro\":\"浴室\",\"id\":\"34\",\"object_name\":\"毛巾\",\"time\":\"2020-11-18 23:41:4\"},{\"enviro\":\"浴室\",\"id\":\"33\",\"object_name\":\"刷牙\",\"time\":\"2020-11-18 23:41:11\"},{\"enviro\":\"浴室\",\"id\":\"21\",\"object_name\":\"水龍頭\",\"time\":\"2020-11-18 23:41:15\"},{\"enviro\":\"浴室\",\"id\":\"41\",\"object_name\":\"木櫃\",\"time\":\"2020-11-18 23:41:30\"}],\"time\":\"2020-11-18 23:40:45\",\"enviro\":\"18\"},{\"items\":[],\"time\":\"2020-11-18 23:47:22\",\"enviro\":\"18\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"43\",\"object_name\":\"剪刀\",\"time\":\"2020-11-18 23:47:49\"},{\"enviro\":\"廚房\",\"id\":\"43\",\"object_name\":\"剪刀\",\"time\":\"2020-11-18 23:47:51\"},{\"enviro\":\"廚房\",\"id\":\"43\",\"object_name\":\"剪刀\",\"time\":\"2020-11-18 23:47:54\"},{\"enviro\":\"廚房\",\"id\":\"43\",\"object_name\":\"剪刀\",\"time\":\"2020-11-18 23:47:56\"},{\"enviro\":\"廚房\",\"id\":\"43\",\"object_name\":\"剪刀\",\"time\":\"2020-11-18 23:47:58\"},{\"enviro\":\"廚房\",\"id\":\"43\",\"object_name\":\"剪刀\",\"time\":\"2020-11-18 23:48:0\"},{\"enviro\":\"廚房\",\"id\":\"43\",\"object_name\":\"剪刀\",\"time\":\"2020-11-18 23:48:2\"},{\"enviro\":\"廚房\",\"id\":\"43\",\"object_name\":\"剪刀\",\"time\":\"2020-11-18 23:48:5\"}],\"time\":\"2020-11-18 23:47:45\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"草原動物\",\"id\":\"27\",\"object_name\":\"狗\",\"time\":\"2020-11-18 23:48:33\"}],\"time\":\"2020-11-18 23:48:9\",\"enviro\":\"20\"}]}', '{\"practice\":[{\"time\":\"2020-11-18 23:43:32\",\"enviro\":\"草原動物\",\"questions\":[{\"object_id\":\"24\",\"your_answer\":[\"24\"]},{\"object_id\":\"26\",\"your_answer\":[\"26\"]},{\"object_id\":\"29\",\"your_answer\":[\"29\"]},{\"object_id\":\"44\",\"your_answer\":[\"44\"]},{\"object_id\":\"24\",\"your_answer\":[\"24\"]},{\"object_id\":\"39\",\"your_answer\":[\"39\"]},{\"object_id\":\"24\",\"your_answer\":[\"24\"]},{\"object_id\":\"27\",\"your_answer\":[\"27\"]},{\"object_id\":\"26\",\"your_answer\":[\"26\"]},{\"object_id\":\"27\",\"your_answer\":[\"27\"]},{\"object_id\":\"32\",\"your_answer\":null}],\"firstCorrect\":10,\"Correct\":10,\"questions_num\":11},{\"time\":\"2020-11-18 23:45:22\",\"enviro\":\"廚房\",\"questions\":[{\"object_id\":\"2\",\"your_answer\":[\"2\"]},{\"object_id\":\"1\",\"your_answer\":[\"1\"]},{\"object_id\":\"43\",\"your_answer\":[\"43\"]},{\"object_id\":\"1\",\"your_answer\":[\"1\"]},{\"object_id\":\"2\",\"your_answer\":[\"2\"]},{\"object_id\":\"20\",\"your_answer\":[\"20\"]},{\"object_id\":\"20\",\"your_answer\":[\"20\"]},{\"object_id\":\"42\",\"your_answer\":[\"40\",\"42\"]},{\"object_id\":\"42\",\"your_answer\":[\"42\"]},{\"object_id\":\"22\",\"your_answer\":[\"22\"]},{\"object_id\":\"20\",\"your_answer\":null}],\"firstCorrect\":9,\"Correct\":10,\"questions_num\":11},{\"time\":\"2020-11-18 23:46:42\",\"enviro\":\"浴室\",\"questions\":[{\"object_id\":\"41\",\"your_answer\":[\"41\"]},{\"object_id\":\"35\",\"your_answer\":[\"35\"]},{\"object_id\":\"21\",\"your_answer\":[\"21\"]},{\"object_id\":\"35\",\"your_answer\":[\"35\"]},{\"object_id\":\"21\",\"your_answer\":[\"21\"]},{\"object_id\":\"35\",\"your_answer\":[\"35\"]},{\"object_id\":\"33\",\"your_answer\":[\"33\"]},{\"object_id\":\"33\",\"your_answer\":[\"33\"]},{\"object_id\":\"35\",\"your_answer\":[\"35\"]},{\"object_id\":\"35\",\"your_answer\":[\"35\"]},{\"object_id\":\"21\",\"your_answer\":null}],\"firstCorrect\":10,\"Correct\":10,\"questions_num\":11}]}', '{\"test\":[{\"questions\":[{\"object_id\":\"28\",\"your_answer_id\":\"27\",\"times\":\"00:01.66\"},{\"object_id\":\"26\",\"your_answer_id\":\"39\",\"times\":\"00:02.83\"},{\"object_id\":\"28\",\"your_answer_id\":\"27\",\"times\":\"00:00.91\"},{\"object_id\":\"39\",\"your_answer_id\":\"27\",\"times\":\"00:01.30\"},{\"object_id\":\"44\",\"your_answer_id\":\"27\",\"times\":\"00:01.03\"},{\"object_id\":\"28\",\"your_answer_id\":\"27\",\"times\":\"00:00.95\"},{\"object_id\":\"28\",\"your_answer_id\":\"27\",\"times\":\"00:01.37\"},{\"object_id\":\"29\",\"your_answer_id\":\"27\",\"times\":\"00:01.50\"},{\"object_id\":\"45\",\"your_answer_id\":\"27\",\"times\":\"00:01.48\"},{\"object_id\":\"45\",\"your_answer_id\":\"27\",\"times\":\"00:01.06\"}],\"accuracy\":{\"your\":0,\"all\":10},\"completion\":{\"your\":0,\"all\":9},\"response_rate\":50,\"high_frequency_accuracy\":{\"your\":0,\"all\":1},\"low_frequency_accuracy\":{\"your\":0,\"all\":7},\"enviro_id\":\"20\",\"enviro_name\":\"草原動物\",\"usetime\":\"00:14.09\",\"time\":\"2020-11-18 23:32:57\"},{\"questions\":[{\"object_id\":\"2\",\"your_answer_id\":\"23\",\"times\":\"00:05.60\"},{\"object_id\":\"40\",\"your_answer_id\":\"42\",\"times\":\"00:04.17\"},{\"object_id\":\"19\",\"your_answer_id\":\"19\",\"times\":\"00:05.59\"},{\"object_id\":\"20\",\"your_answer_id\":\"1\",\"times\":\"00:07.25\"},{\"object_id\":\"23\",\"your_answer_id\":\"23\",\"times\":\"00:04.13\"},{\"object_id\":\"23\",\"your_answer_id\":\"23\",\"times\":\"00:02.15\"},{\"object_id\":\"43\",\"your_answer_id\":\"37\",\"times\":\"00:07.21\"},{\"object_id\":\"42\",\"your_answer_id\":\"42\",\"times\":\"00:03.16\"},{\"object_id\":\"43\",\"your_answer_id\":\"37\",\"times\":\"00:03.23\"},{\"object_id\":\"19\",\"your_answer_id\":\"37\",\"times\":\"00:05.62\"}],\"accuracy\":{\"your\":4,\"all\":10},\"completion\":{\"your\":3,\"all\":10},\"response_rate\":50,\"high_frequency_accuracy\":{\"your\":0,\"all\":2},\"low_frequency_accuracy\":{\"your\":4,\"all\":8},\"enviro_id\":\"1\",\"enviro_name\":\"廚房\",\"usetime\":\"00:48.11\",\"time\":\"2020-11-18 23:34:42\"},{\"questions\":[{\"object_id\":\"21\",\"your_answer_id\":\"21\",\"times\":\"00:04.62\"},{\"object_id\":\"21\",\"your_answer_id\":\"21\",\"times\":\"00:01.87\"},{\"object_id\":\"41\",\"your_answer_id\":\"41\",\"times\":\"00:02.97\"},{\"object_id\":\"34\",\"your_answer_id\":\"34\",\"times\":\"00:06.59\"},{\"object_id\":\"34\",\"your_answer_id\":\"34\",\"times\":\"00:04.86\"},{\"object_id\":\"21\",\"your_answer_id\":\"21\",\"times\":\"00:03.02\"},{\"object_id\":\"41\",\"your_answer_id\":\"41\",\"times\":\"00:02.40\"},{\"object_id\":\"35\",\"your_answer_id\":\"35\",\"times\":\"00:03.06\"},{\"object_id\":\"34\",\"your_answer_id\":\"34\",\"times\":\"00:03.31\"},{\"object_id\":\"35\",\"your_answer_id\":\"35\",\"times\":\"00:02.36\"}],\"accuracy\":{\"your\":10,\"all\":10},\"completion\":{\"your\":4,\"all\":5},\"response_rate\":50,\"high_frequency_accuracy\":{\"your\":3,\"all\":3},\"low_frequency_accuracy\":{\"your\":7,\"all\":7},\"enviro_id\":\"18\",\"enviro_name\":\"浴室\",\"usetime\":\"00:35.06\",\"time\":\"2020-11-18 23:36:13\"},{\"questions\":[{\"object_id\":\"26\",\"your_answer_id\":\"26\",\"times\":\"00:02.20\"},{\"object_id\":\"26\",\"your_answer_id\":\"26\",\"times\":\"00:01.37\"},{\"object_id\":\"26\",\"your_answer_id\":\"26\",\"times\":\"00:01.32\"},{\"object_id\":\"24\",\"your_answer_id\":\"24\",\"times\":\"00:01.57\"},{\"object_id\":\"27\",\"your_answer_id\":\"27\",\"times\":\"00:01.51\"},{\"object_id\":\"29\",\"your_answer_id\":\"29\",\"times\":\"00:01.82\"},{\"object_id\":\"32\",\"your_answer_id\":\"32\",\"times\":\"00:02.54\"},{\"object_id\":\"39\",\"your_answer_id\":\"39\",\"times\":\"00:01.51\"},{\"object_id\":\"28\",\"your_answer_id\":\"28\",\"times\":\"00:02.37\"},{\"object_id\":\"32\",\"your_answer_id\":\"32\",\"times\":\"00:02.21\"}],\"accuracy\":{\"your\":10,\"all\":10},\"completion\":{\"your\":7,\"all\":9},\"response_rate\":50,\"high_frequency_accuracy\":{\"your\":3,\"all\":3},\"low_frequency_accuracy\":{\"your\":2,\"all\":2},\"enviro_id\":\"20\",\"enviro_name\":\"草原動物\",\"usetime\":\"00:18.42\",\"time\":\"2020-11-18 23:50:18\"},{\"questions\":[{\"object_id\":\"20\",\"your_answer_id\":\"20\",\"times\":\"00:02.28\"},{\"object_id\":\"23\",\"your_answer_id\":\"23\",\"times\":\"00:01.99\"},{\"object_id\":\"43\",\"your_answer_id\":\"43\",\"times\":\"00:01.43\"},{\"object_id\":\"43\",\"your_answer_id\":\"43\",\"times\":\"00:01.11\"},{\"object_id\":\"19\",\"your_answer_id\":\"19\",\"times\":\"00:03.94\"},{\"object_id\":\"42\",\"your_answer_id\":\"42\",\"times\":\"00:03.02\"},{\"object_id\":\"20\",\"your_answer_id\":\"20\",\"times\":\"00:02.99\"},{\"object_id\":\"1\",\"your_answer_id\":\"1\",\"times\":\"00:02.49\"},{\"object_id\":\"42\",\"your_answer_id\":\"42\",\"times\":\"00:01.53\"},{\"object_id\":\"37\",\"your_answer_id\":\"37\",\"times\":\"00:09.90\"}],\"accuracy\":{\"your\":10,\"all\":10},\"completion\":{\"your\":7,\"all\":10},\"response_rate\":50,\"high_frequency_accuracy\":{\"your\":2,\"all\":2},\"low_frequency_accuracy\":{\"your\":8,\"all\":8},\"enviro_id\":\"1\",\"enviro_name\":\"廚房\",\"usetime\":\"00:30.68\",\"time\":\"2020-11-18 23:51:48\"},{\"questions\":[{\"object_id\":\"33\",\"your_answer_id\":\"33\",\"times\":\"00:02.15\"},{\"object_id\":\"35\",\"your_answer_id\":\"35\",\"times\":\"00:01.81\"},{\"object_id\":\"33\",\"your_answer_id\":\"33\",\"times\":\"00:01.58\"},{\"object_id\":\"35\",\"your_answer_id\":\"35\",\"times\":\"00:02.20\"},{\"object_id\":\"21\",\"your_answer_id\":\"21\",\"times\":\"00:01.97\"},{\"object_id\":\"41\",\"your_answer_id\":\"41\",\"times\":\"00:01.98\"},{\"object_id\":\"41\",\"your_answer_id\":\"41\",\"times\":\"00:05.47\"},{\"object_id\":\"21\",\"your_answer_id\":\"21\",\"times\":\"00:02.23\"},{\"object_id\":\"34\",\"your_answer_id\":\"34\",\"times\":\"00:04.39\"},{\"object_id\":\"33\",\"your_answer_id\":\"33\",\"times\":\"00:01.60\"}],\"accuracy\":{\"your\":10,\"all\":10},\"completion\":{\"your\":5,\"all\":5},\"response_rate\":50,\"high_frequency_accuracy\":{\"your\":2,\"all\":2},\"low_frequency_accuracy\":{\"your\":8,\"all\":8},\"enviro_id\":\"18\",\"enviro_name\":\"浴室\",\"usetime\":\"00:25.38\",\"time\":\"2020-11-18 23:53:7\"}]}'),
('acs107123', '{\"train\":[{\"items\":[{\"enviro\":\"草原動物\",\"id\":\"28\",\"object_name\":\"貓頭鷹\",\"time\":\"2020-11-12 15:16:16\"},{\"enviro\":\"草原動物\",\"id\":\"26\",\"object_name\":\"烏鴉\",\"time\":\"2020-11-12 15:16:21\"},{\"enviro\":\"草原動物\",\"id\":\"24\",\"object_name\":\"貓\",\"time\":\"2020-11-12 15:16:23\"},{\"enviro\":\"草原動物\",\"id\":\"29\",\"object_name\":\"獅子\",\"time\":\"2020-11-12 15:16:33\"},{\"enviro\":\"草原動物\",\"id\":\"39\",\"object_name\":\"樹蛙\",\"time\":\"2020-11-12 15:16:49\"},{\"enviro\":\"草原動物\",\"id\":\"44\",\"object_name\":\"山羊\",\"time\":\"2020-11-12 15:16:55\"}],\"time\":\"2020-11-12 15:15:47\",\"enviro\":\"20\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"23\",\"object_name\":\"掃地\",\"time\":\"2020-11-12 15:17:19\"},{\"enviro\":\"廚房\",\"id\":\"22\",\"object_name\":\"瓶子\",\"time\":\"2020-11-12 15:17:24\"},{\"enviro\":\"廚房\",\"id\":\"43\",\"object_name\":\"剪刀\",\"time\":\"2020-11-12 15:17:27\"},{\"enviro\":\"廚房\",\"id\":\"40\",\"object_name\":\"吸塵器\",\"time\":\"2020-11-12 15:17:41\"},{\"enviro\":\"廚房\",\"id\":\"42\",\"object_name\":\"果汁機\",\"time\":\"2020-11-12 15:17:49\"},{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-12 15:18:0\"},{\"enviro\":\"廚房\",\"id\":\"20\",\"object_name\":\"烤麵包機\",\"time\":\"2020-11-12 15:18:16\"}],\"time\":\"2020-11-12 15:17:10\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"浴室\",\"id\":\"34\",\"object_name\":\"毛巾\",\"time\":\"2020-11-12 15:18:45\"},{\"enviro\":\"浴室\",\"id\":\"21\",\"object_name\":\"水龍頭\",\"time\":\"2020-11-12 15:18:55\"},{\"enviro\":\"浴室\",\"id\":\"41\",\"object_name\":\"木櫃\",\"time\":\"2020-11-12 15:19:6\"}],\"time\":\"2020-11-12 15:18:32\",\"enviro\":\"18\"}]}', '{\"practice\":[{\"time\":\"2020-11-12 15:22:19\",\"enviro\":\"草原動物\",\"questions\":[{\"object_id\":\"45\",\"your_answer\":[\"45\"]},{\"object_id\":\"26\",\"your_answer\":[\"26\"]},{\"object_id\":\"39\",\"your_answer\":[\"39\"]},{\"object_id\":\"45\",\"your_answer\":[\"45\"]},{\"object_id\":\"45\",\"your_answer\":[\"45\"]},{\"object_id\":\"45\",\"your_answer\":[\"45\"]},{\"object_id\":\"32\",\"your_answer\":[\"32\"]},{\"object_id\":\"28\",\"your_answer\":[\"28\"]},{\"object_id\":\"24\",\"your_answer\":[\"24\"]},{\"object_id\":\"44\",\"your_answer\":[\"44\"]},{\"object_id\":\"27\",\"your_answer\":null}],\"firstCorrect\":10,\"Correct\":10,\"questions_num\":11},{\"time\":\"2020-11-12 15:24:6\",\"enviro\":\"廚房\",\"questions\":[{\"object_id\":\"1\",\"your_answer\":[\"1\"]},{\"object_id\":\"43\",\"your_answer\":[\"43\"]},{\"object_id\":\"19\",\"your_answer\":[\"19\"]},{\"object_id\":\"42\",\"your_answer\":[\"42\"]},{\"object_id\":\"37\",\"your_answer\":[\"37\"]},{\"object_id\":\"37\",\"your_answer\":[\"37\"]},{\"object_id\":\"20\",\"your_answer\":[\"20\"]},{\"object_id\":\"22\",\"your_answer\":[\"22\"]},{\"object_id\":\"2\",\"your_answer\":[\"2\"]},{\"object_id\":\"1\",\"your_answer\":[\"1\"]},{\"object_id\":\"37\",\"your_answer\":null}],\"firstCorrect\":10,\"Correct\":10,\"questions_num\":11},{\"time\":\"2020-11-12 15:25:27\",\"enviro\":\"浴室\",\"questions\":[{\"object_id\":\"34\",\"your_answer\":[\"34\"]},{\"object_id\":\"41\",\"your_answer\":[\"41\"]},{\"object_id\":\"21\",\"your_answer\":[\"21\"]},{\"object_id\":\"35\",\"your_answer\":[\"35\"]},{\"object_id\":\"34\",\"your_answer\":[\"34\"]},{\"object_id\":\"34\",\"your_answer\":[\"34\"]},{\"object_id\":\"35\",\"your_answer\":[\"35\"]},{\"object_id\":\"21\",\"your_answer\":[\"21\"]},{\"object_id\":\"33\",\"your_answer\":[\"33\"]},{\"object_id\":\"41\",\"your_answer\":[\"41\"]},{\"object_id\":\"21\",\"your_answer\":null}],\"firstCorrect\":10,\"Correct\":10,\"questions_num\":11},{\"time\":\"2020-11-12 15:31:7\",\"enviro\":\"草原動物\",\"questions\":[{\"object_id\":\"45\",\"your_answer\":[\"44\",\"26\",\"45\"]},{\"object_id\":\"29\",\"your_answer\":[\"29\"]},{\"object_id\":\"39\",\"your_answer\":[\"27\",\"24\",\"39\"]},{\"object_id\":\"45\",\"your_answer\":[\"45\"]},{\"object_id\":\"27\",\"your_answer\":[\"24\",\"32\",\"27\"]},{\"object_id\":\"28\",\"your_answer\":[\"28\"]},{\"object_id\":\"26\",\"your_answer\":[\"26\"]},{\"object_id\":\"45\",\"your_answer\":[\"45\"]},{\"object_id\":\"44\",\"your_answer\":[\"44\"]},{\"object_id\":\"29\",\"your_answer\":[\"29\"]},{\"object_id\":\"45\",\"your_answer\":[\"45\"]},{\"object_id\":\"26\",\"your_answer\":[\"26\"]},{\"object_id\":\"45\",\"your_answer\":[\"45\"]},{\"object_id\":\"45\",\"your_answer\":[]},{\"object_id\":\"26\",\"your_answer\":[\"26\"]},{\"object_id\":\"27\",\"your_answer\":[\"27\"]},{\"object_id\":\"32\",\"your_answer\":[\"32\"]},{\"object_id\":\"28\",\"your_answer\":[\"28\"]},{\"object_id\":\"32\",\"your_answer\":[\"32\"]},{\"object_id\":\"39\",\"your_answer\":null}],\"firstCorrect\":15,\"Correct\":18,\"questions_num\":20}]}', '{\"test\":[{\"questions\":[{\"object_id\":\"39\",\"your_answer_id\":\"39\",\"times\":\"00:07.07\"},{\"object_id\":\"29\",\"your_answer_id\":\"29\",\"times\":\"00:05.31\"},{\"object_id\":\"28\",\"your_answer_id\":\"28\",\"times\":\"00:03.90\"},{\"object_id\":\"44\",\"your_answer_id\":\"44\",\"times\":\"00:03.24\"},{\"object_id\":\"32\",\"your_answer_id\":\"32\",\"times\":\"00:03.67\"},{\"object_id\":\"29\",\"your_answer_id\":\"29\",\"times\":\"00:05.18\"},{\"object_id\":\"44\",\"your_answer_id\":\"44\",\"times\":\"00:02.48\"},{\"object_id\":\"45\",\"your_answer_id\":\"45\",\"times\":\"00:02.34\"},{\"object_id\":\"26\",\"your_answer_id\":\"26\",\"times\":\"00:02.34\"},{\"object_id\":\"26\",\"your_answer_id\":\"26\",\"times\":\"00:01.35\"}],\"accuracy\":{\"your\":10,\"all\":10},\"completion\":{\"your\":7,\"all\":9},\"response_rate\":50,\"high_frequency_accuracy\":{\"your\":3,\"all\":3},\"low_frequency_accuracy\":{\"your\":4,\"all\":4},\"enviro_id\":\"20\",\"enviro_name\":\"草原動物\",\"usetime\":\"00:36.88\",\"time\":\"2020-11-12 15:9:16\"},{\"questions\":[{\"object_id\":\"1\",\"your_answer_id\":\"1\",\"times\":\"00:03.40\"},{\"object_id\":\"42\",\"your_answer_id\":\"42\",\"times\":\"00:04.81\"},{\"object_id\":\"37\",\"your_answer_id\":\"37\",\"times\":\"00:19.82\"},{\"object_id\":\"42\",\"your_answer_id\":\"42\",\"times\":\"00:02.03\"},{\"object_id\":\"42\",\"your_answer_id\":\"42\",\"times\":\"00:02.62\"},{\"object_id\":\"37\",\"your_answer_id\":\"37\",\"times\":\"00:07.90\"},{\"object_id\":\"22\",\"your_answer_id\":\"22\",\"times\":\"00:18.82\"},{\"object_id\":\"23\",\"your_answer_id\":\"23\",\"times\":\"39:04.99\"},{\"object_id\":\"23\",\"your_answer_id\":\"23\",\"times\":\"00:03.00\"},{\"object_id\":\"1\",\"your_answer_id\":\"1\",\"times\":\"00:02.42\"}],\"accuracy\":{\"your\":10,\"all\":10},\"completion\":{\"your\":5,\"all\":10},\"response_rate\":50,\"high_frequency_accuracy\":{\"your\":0,\"all\":0},\"low_frequency_accuracy\":{\"your\":9,\"all\":9},\"enviro_id\":\"1\",\"enviro_name\":\"廚房\",\"usetime\":\"01:09.81\",\"time\":\"2020-11-12 15:11:48\"},{\"questions\":[{\"object_id\":\"34\",\"your_answer_id\":\"34\",\"times\":\"00:14.49\"},{\"object_id\":\"35\",\"your_answer_id\":\"35\",\"times\":\"00:03.13\"},{\"object_id\":\"41\",\"your_answer_id\":\"41\",\"times\":\"00:02.59\"},{\"object_id\":\"41\",\"your_answer_id\":\"41\",\"times\":\"00:01.72\"},{\"object_id\":\"21\",\"your_answer_id\":\"21\",\"times\":\"00:05.98\"},{\"object_id\":\"33\",\"your_answer_id\":\"33\",\"times\":\"00:03.23\"},{\"object_id\":\"33\",\"your_answer_id\":\"33\",\"times\":\"00:01.08\"},{\"object_id\":\"21\",\"your_answer_id\":\"21\",\"times\":\"00:03.39\"},{\"object_id\":\"34\",\"your_answer_id\":\"34\",\"times\":\"00:05.03\"},{\"object_id\":\"33\",\"your_answer_id\":\"33\",\"times\":\"00:01.89\"}],\"accuracy\":{\"your\":10,\"all\":10},\"completion\":{\"your\":5,\"all\":5},\"response_rate\":50,\"high_frequency_accuracy\":{\"your\":2,\"all\":2},\"low_frequency_accuracy\":{\"your\":8,\"all\":8},\"enviro_id\":\"18\",\"enviro_name\":\"浴室\",\"usetime\":\"00:42.53\",\"time\":\"2020-11-12 15:14:11\"},{\"questions\":[{\"object_id\":\"28\",\"your_answer_id\":\"28\",\"times\":\"00:02.70\"},{\"object_id\":\"28\",\"your_answer_id\":\"28\",\"times\":\"00:01.58\"},{\"object_id\":\"28\",\"your_answer_id\":\"28\",\"times\":\"00:01.28\"},{\"object_id\":\"45\",\"your_answer_id\":\"45\",\"times\":\"00:03.16\"},{\"object_id\":\"24\",\"your_answer_id\":\"24\",\"times\":\"00:01.91\"},{\"object_id\":\"27\",\"your_answer_id\":\"27\",\"times\":\"00:02.00\"},{\"object_id\":\"45\",\"your_answer_id\":\"45\",\"times\":\"00:02.76\"},{\"object_id\":\"45\",\"your_answer_id\":\"45\",\"times\":\"00:02.39\"},{\"object_id\":\"44\",\"your_answer_id\":\"44\",\"times\":\"00:02.23\"},{\"object_id\":\"44\",\"your_answer_id\":\"44\",\"times\":\"00:02.33\"}],\"accuracy\":{\"your\":10,\"all\":10},\"completion\":{\"your\":5,\"all\":9},\"response_rate\":50,\"high_frequency_accuracy\":{\"your\":3,\"all\":3},\"low_frequency_accuracy\":{\"your\":6,\"all\":6},\"enviro_id\":\"20\",\"enviro_name\":\"草原動物\",\"usetime\":\"00:22.34\",\"time\":\"2020-11-12 15:33:21\"},{\"questions\":[{\"object_id\":\"23\",\"your_answer_id\":\"23\",\"times\":\"00:05.39\"},{\"object_id\":\"19\",\"your_answer_id\":\"19\",\"times\":\"00:02.19\"},{\"object_id\":\"40\",\"your_answer_id\":\"42\",\"times\":\"00:07.15\"},{\"object_id\":\"23\",\"your_answer_id\":\"23\",\"times\":\"00:01.81\"},{\"object_id\":\"2\",\"your_answer_id\":\"2\",\"times\":\"00:02.53\"},{\"object_id\":\"20\",\"your_answer_id\":\"20\",\"times\":\"00:02.56\"},{\"object_id\":\"23\",\"your_answer_id\":\"23\",\"times\":\"00:01.86\"},{\"object_id\":\"2\",\"your_answer_id\":\"2\",\"times\":\"00:02.07\"},{\"object_id\":\"1\",\"your_answer_id\":\"1\",\"times\":\"00:02.52\"},{\"object_id\":\"22\",\"your_answer_id\":\"22\",\"times\":\"00:02.48\"}],\"accuracy\":{\"your\":9,\"all\":10},\"completion\":{\"your\":6,\"all\":10},\"response_rate\":50,\"high_frequency_accuracy\":{\"your\":0,\"all\":0},\"low_frequency_accuracy\":{\"your\":8,\"all\":9},\"enviro_id\":\"1\",\"enviro_name\":\"廚房\",\"usetime\":\"00:30.56\",\"time\":\"2020-11-12 15:35:1\"},{\"questions\":[{\"object_id\":\"35\",\"your_answer_id\":\"35\",\"times\":\"00:01.90\"},{\"object_id\":\"34\",\"your_answer_id\":\"34\",\"times\":\"00:01.99\"},{\"object_id\":\"35\",\"your_answer_id\":\"35\",\"times\":\"00:01.15\"},{\"object_id\":\"35\",\"your_answer_id\":\"35\",\"times\":\"00:01.31\"},{\"object_id\":\"21\",\"your_answer_id\":\"21\",\"times\":\"00:01.73\"},{\"object_id\":\"21\",\"your_answer_id\":\"21\",\"times\":\"00:01.62\"},{\"object_id\":\"21\",\"your_answer_id\":\"21\",\"times\":\"00:01.52\"},{\"object_id\":\"41\",\"your_answer_id\":\"41\",\"times\":\"00:01.16\"},{\"object_id\":\"33\",\"your_answer_id\":\"33\",\"times\":\"00:01.32\"},{\"object_id\":\"41\",\"your_answer_id\":\"41\",\"times\":\"00:01.05\"}],\"accuracy\":{\"your\":10,\"all\":10},\"completion\":{\"your\":5,\"all\":5},\"response_rate\":50,\"high_frequency_accuracy\":{\"your\":3,\"all\":3},\"low_frequency_accuracy\":{\"your\":7,\"all\":7},\"enviro_id\":\"18\",\"enviro_name\":\"浴室\",\"usetime\":\"00:14.75\",\"time\":\"2020-11-12 15:36:27\"}]}'),
('test', '{\"train\":[{\"items\":[],\"time\":\"2020-11-18 23:24:15\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-18 23:25:15\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-18 23:25:26\",\"enviro\":\"1\"}]}', '{\"practice\":[]}', '{\"test\":[]}'),
('test0001', '{\"train\":[{\"items\":[],\"time\":\"2020-11-12 14:56:42\",\"enviro\":\"1\"}]}', '{\"practice\":[]}', '{\"test\":[]}'),
('test002', '{\"train\":[{\"items\":[{\"enviro\":\"1\",\"id\":\"43\",\"time\":\"2020-10-21 10:44:57\"},{\"enviro\":\"1\",\"id\":\"43\",\"time\":\"2020-10-21 10:45:0\"}],\"time\":\"2020-10-21 10:44:53\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"1\",\"id\":\"22\",\"time\":\"2020-10-21 10:48:41\"},{\"enviro\":\"1\",\"id\":\"43\",\"time\":\"2020-10-21 10:48:45\"}],\"time\":\"2020-10-21 10:48:35\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"1\",\"id\":\"43\",\"time\":\"2020-10-21 10:52:9\"},{\"enviro\":\"1\",\"id\":\"22\",\"time\":\"2020-10-21 10:52:15\"}],\"time\":\"2020-10-21 10:52:7\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"18\",\"id\":\"21\",\"time\":\"2020-10-21 10:52:38\"},{\"enviro\":\"18\",\"id\":\"34\",\"time\":\"2020-10-21 10:52:43\"},{\"enviro\":\"18\",\"id\":\"33\",\"time\":\"2020-10-21 10:52:50\"}],\"time\":\"2020-10-21 10:52:33\",\"enviro\":\"18\"},{\"items\":[],\"time\":\"2020-11-3 15:0:46\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-5 15:29:46\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-5 15:30:28\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-5 15:31:22\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-5 15:31:36\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-5 15:33:38\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-5 15:40:15\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-5 15:42:47\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-5 15:43:12\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-5 15:43:28\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-5 15:43:56\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-5 15:44:11\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-5 15:44:30\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-5 15:45:55\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-5 15:46:10\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-5 15:53:3\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-5 15:53:34\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-5 15:54:8\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-5 15:54:32\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-5 15:55:30\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-5 15:56:32\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-5 15:57:26\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-5 16:1:46\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-5 16:2:15\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-5 17:59:6\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-7 9:57:55\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-8 19:56:31\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-8 19:57:0\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-8 21:29:34\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-8 22:49:5\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-9 10:53:59\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-9 19:34:6\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-9 20:57:46\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-9 22:34:19\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-9 23:11:58\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-10 10:34:35\"}],\"time\":\"2020-11-10 10:33:47\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-10 10:55:6\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-10 10:55:20\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-10 10:55:51\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-10 11:23:19\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-10 19:37:52\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"43\",\"object_name\":\"剪刀\",\"time\":\"2020-11-10 19:39:15\"},{\"enviro\":\"廚房\",\"id\":\"22\",\"object_name\":\"瓶子\",\"time\":\"2020-11-10 19:39:20\"},{\"enviro\":\"廚房\",\"id\":\"43\",\"object_name\":\"剪刀\",\"time\":\"2020-11-10 19:39:25\"}],\"time\":\"2020-11-10 19:39:6\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-10 19:45:17\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-10 19:45:20\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-10 19:47:3\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-10 19:47:18\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-10 19:50:20\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-10 20:23:12\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"2\",\"object_name\":\"沸水\",\"time\":\"2020-11-10 20:23:39\"}],\"time\":\"2020-11-10 20:23:22\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-10 20:25:8\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-10 20:26:40\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-10 20:29:32\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-10 20:32:33\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-10 20:33:31\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-10 20:36:6\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-10 20:36:43\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-10 20:37:26\"},{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-10 20:46:55\"},{\"enviro\":\"廚房\",\"id\":\"43\",\"object_name\":\"剪刀\",\"time\":\"2020-11-10 20:47:13\"}],\"time\":\"2020-11-10 20:37:8\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-10 20:48:55\"},{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-10 20:51:34\"}],\"time\":\"2020-11-10 20:48:43\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-10 20:55:10\"}],\"time\":\"2020-11-10 20:55:4\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-10 20:56:58\"},{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-10 20:57:5\"}],\"time\":\"2020-11-10 20:56:48\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-10 21:1:16\"}],\"time\":\"2020-11-10 21:1:8\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-10 21:3:1\"},{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-10 21:3:16\"},{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-10 21:3:34\"},{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-10 21:4:20\"}],\"time\":\"2020-11-10 21:2:47\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-10 21:10:11\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-10 21:10:47\"}],\"time\":\"2020-11-10 21:10:35\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-10 21:11:24\"}],\"time\":\"2020-11-10 21:11:17\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-10 21:12:9\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-10 21:14:23\"}],\"time\":\"2020-11-10 21:14:15\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-10 21:16:14\"},{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-10 21:17:0\"}],\"time\":\"2020-11-10 21:15:48\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-10 21:38:28\"}],\"time\":\"2020-11-10 21:38:19\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-10 21:53:5\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-10 22:55:37\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-10 23:10:14\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 15:40:9\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 15:40:32\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 15:41:42\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 15:42:1\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 15:42:48\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 15:44:16\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 15:45:32\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 15:47:47\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 15:48:5\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 15:48:43\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 15:50:44\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 15:51:28\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 15:53:29\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 15:54:1\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 15:55:58\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 15:56:18\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 15:58:34\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 15:58:57\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 15:59:39\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-11 16:0:15\"}],\"time\":\"2020-11-11 16:0:8\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-11 19:15:1\"}],\"time\":\"2020-11-11 16:17:13\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-11 19:37:37\"}],\"time\":\"2020-11-11 19:37:27\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 20:24:26\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 20:29:14\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-11 20:31:33\"},{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-11 20:31:40\"}],\"time\":\"2020-11-11 20:31:24\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-11 20:32:23\"}],\"time\":\"2020-11-11 20:32:13\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 20:32:42\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 20:36:1\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 20:36:49\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-11 20:41:17\"}],\"time\":\"2020-11-11 20:41:11\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 20:42:43\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 20:44:31\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 20:54:55\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 20:55:19\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 20:55:52\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 20:56:27\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 20:58:40\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-11 20:59:3\"},{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-11 20:59:24\"}],\"time\":\"2020-11-11 20:58:55\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-11 20:59:48\"}],\"time\":\"2020-11-11 20:59:41\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 21:5:53\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-11 21:6:57\"}],\"time\":\"2020-11-11 21:6:48\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-11 21:8:21\"}],\"time\":\"2020-11-11 21:8:15\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-11 21:9:4\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-12 0:38:11\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-12 0:38:35\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-12 9:39:16\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-12 15:58:31\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-19 10:16:4\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-19 10:17:5\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-19 10:17:33\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-19 10:17:44\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-19 10:19:59\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-19 10:20:48\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-19 10:21:17\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-19 10:21:41\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-19 10:22:13\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-19 10:22:30\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-19 10:22:43\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-19 10:22:57\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-19 10:23:31\"}],\"time\":\"2020-11-19 10:23:17\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-19 10:25:31\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-19 10:25:57\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-19 10:31:1\"}],\"time\":\"2020-11-19 10:30:54\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-19 10:32:50\"}],\"time\":\"2020-11-19 10:32:44\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-19 11:47:38\"}],\"time\":\"2020-11-19 11:47:15\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-19 13:47:23\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-19 13:48:11\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-19 14:4:38\",\"enviro\":\"20\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-19 14:7:29\"}],\"time\":\"2020-11-19 14:7:11\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"浴室\",\"id\":\"21\",\"object_name\":\"水龍頭\",\"time\":\"2020-11-19 14:9:12\"},{\"enviro\":\"浴室\",\"id\":\"33\",\"object_name\":\"刷牙\",\"time\":\"2020-11-19 14:9:24\"}],\"time\":\"2020-11-19 14:8:59\",\"enviro\":\"18\"},{\"items\":[],\"time\":\"2020-11-19 19:4:20\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-21 17:20:40\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-23 22:30:16\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"43\",\"object_name\":\"剪刀\",\"time\":\"2020-11-23 22:32:54\"}],\"time\":\"2020-11-23 22:32:12\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-23 22:33:15\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-24 23:47:50\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-25 17:12:42\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-25 17:12:56\",\"enviro\":\"1\"},{\"items\":[{\"enviro\":\"廚房\",\"id\":\"1\",\"object_name\":\"菜刀\",\"time\":\"2020-11-25 17:16:15\"}],\"time\":\"2020-11-25 17:16:0\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-25 17:21:3\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-25 17:23:3\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-28 17:54:34\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-11-28 17:54:49\",\"enviro\":\"1\"},{\"items\":[],\"time\":\"2020-12-1 11:55:58\",\"enviro\":\"1\"}]}', '{\"practice\":[{\"time\":\"2020-10-22 11:43:32\",\"enviro\":\"1\",\"questions\":[{\"object_id\":\"1\",\"your_answer\":[\"22\",\"1\"]},{\"object_id\":\"42\",\"your_answer\":[\"42\"]},{\"object_id\":\"22\",\"your_answer\":null}]},{\"time\":\"2020-10-22 12:7:40\",\"enviro\":\"1\",\"questions\":[{\"object_id\":\"43\",\"your_answer\":[\"43\"]},{\"object_id\":\"43\",\"your_answer\":[\"43\"]},{\"object_id\":\"37\",\"your_answer\":null}]},{\"time\":\"2020-10-22 13:47:53\",\"enviro\":\"1\",\"questions\":[{\"object_id\":\"22\",\"your_answer\":[\"22\"]},{\"object_id\":\"43\",\"your_answer\":[\"43\"]},{\"object_id\":\"22\",\"your_answer\":null}]},{\"time\":\"2020-10-29 13:41:27\",\"enviro\":\"1\",\"questions\":[{\"object_id\":\"42\",\"your_answer\":null}]},{\"time\":\"2020-11-3 15:0:55\",\"enviro\":\"1\",\"questions\":[{\"object_id\":\"37\",\"your_answer\":null}]},{\"time\":\"2020-11-10 19:39:46\",\"enviro\":\"廚房\",\"questions\":[{\"object_id\":\"40\",\"your_answer\":null}],\"firstCorrect\":0,\"Correct\":0,\"questions_num\":1}]}', '{\"test\":[{\"questions\":[{\"object_id\":\"2\",\"your_answer_id\":\"22\",\"times\":0},{\"object_id\":\"23\",\"your_answer_id\":\"22\",\"times\":0},{\"object_id\":\"2\",\"your_answer_id\":\"22\",\"times\":0},{\"object_id\":\"43\",\"your_answer_id\":\"22\",\"times\":0},{\"object_id\":\"2\",\"your_answer_id\":\"22\",\"times\":0},{\"object_id\":\"42\",\"your_answer_id\":\"22\",\"times\":0},{\"object_id\":\"23\",\"your_answer_id\":\"22\",\"times\":0},{\"object_id\":\"43\",\"your_answer_id\":\"22\",\"times\":0},{\"object_id\":\"23\",\"your_answer_id\":\"22\",\"times\":0},{\"object_id\":\"2\",\"your_answer_id\":\"22\",\"times\":0}],\"accuracy\":{\"your\":0,\"all\":10},\"completion\":{\"your\":0,\"all\":10},\"response_rate\":50,\"high_frequency_accuracy\":{\"your\":0,\"all\":2},\"low_frequency_accuracy\":{\"your\":0,\"all\":8},\"enviro_id\":\"1\",\"time\":\"2020-10-22 11:44:52\"},{\"questions\":[{\"object_id\":\"24\",\"your_answer_id\":\"24\",\"times\":\"00:10.39\"},{\"object_id\":\"28\",\"your_answer_id\":\"28\",\"times\":\"00:01.43\"},{\"object_id\":\"39\",\"your_answer_id\":\"39\",\"times\":\"00:02.36\"},{\"object_id\":\"32\",\"your_answer_id\":\"32\",\"times\":\"00:02.21\"},{\"object_id\":\"27\",\"your_answer_id\":\"27\",\"times\":\"00:02.44\"},{\"object_id\":\"26\",\"your_answer_id\":\"26\",\"times\":\"00:01.30\"},{\"object_id\":\"45\",\"your_answer_id\":\"45\",\"times\":\"00:02.31\"},{\"object_id\":\"39\",\"your_answer_id\":\"29\",\"times\":\"00:02.29\"},{\"object_id\":\"44\",\"your_answer_id\":\"44\",\"times\":\"00:02.03\"},{\"object_id\":\"44\",\"your_answer_id\":\"44\",\"times\":\"00:02.09\"}],\"accuracy\":{\"your\":9,\"all\":10},\"completion\":{\"your\":8,\"all\":9},\"response_rate\":50,\"high_frequency_accuracy\":{\"your\":4,\"all\":4},\"low_frequency_accuracy\":{\"your\":2,\"all\":2},\"enviro_id\":\"20\",\"enviro_name\":\"草原動物\",\"usetime\":\"00:28.85\",\"time\":\"2020-11-9 10:59:1\"},{\"questions\":[{\"object_id\":\"21\",\"your_answer_id\":\"34\",\"times\":\"00:00.30\"},{\"object_id\":\"21\",\"your_answer_id\":\"34\",\"times\":\"00:00.10\"},{\"object_id\":\"34\",\"your_answer_id\":\"34\",\"times\":\"00:00.15\"},{\"object_id\":\"21\",\"your_answer_id\":\"34\",\"times\":\"00:00.18\"},{\"object_id\":\"21\",\"your_answer_id\":\"34\",\"times\":\"00:00.25\"},{\"object_id\":\"41\",\"your_answer_id\":\"34\",\"times\":\"00:00.18\"},{\"object_id\":\"34\",\"your_answer_id\":\"34\",\"times\":\"00:00.30\"},{\"object_id\":\"41\",\"your_answer_id\":\"34\",\"times\":\"00:00.31\"},{\"object_id\":\"41\",\"your_answer_id\":\"34\",\"times\":\"00:00.31\"},{\"object_id\":\"33\",\"your_answer_id\":\"34\",\"times\":\"00:00.22\"}],\"accuracy\":{\"your\":2,\"all\":10},\"completion\":{\"your\":1,\"all\":5},\"response_rate\":50,\"high_frequency_accuracy\":{\"your\":0,\"all\":4},\"low_frequency_accuracy\":{\"your\":2,\"all\":6},\"enviro_id\":\"18\",\"enviro_name\":\"浴室\",\"usetime\":\"00:02.30\",\"time\":\"2020-11-9 11:25:9\"}]}'),
('test1111', '{\"train\":[{\"items\":[{\"enviro\":\"浴室\",\"id\":\"34\",\"object_name\":\"毛巾\",\"time\":\"2020-11-29 15:0:50\"},{\"enviro\":\"浴室\",\"id\":\"21\",\"object_name\":\"水龍頭\",\"time\":\"2020-11-29 15:1:0\"},{\"enviro\":\"浴室\",\"id\":\"35\",\"object_name\":\"馬桶\",\"time\":\"2020-11-29 15:1:18\"}],\"time\":\"2020-11-29 15:0:41\",\"enviro\":\"18\"}]}', '{\"practice\":[{\"time\":\"2020-11-29 15:3:56\",\"enviro\":\"廚房\",\"questions\":[{\"object_id\":\"22\",\"your_answer\":[\"22\"]},{\"object_id\":\"23\",\"your_answer\":[\"43\",\"23\"]},{\"object_id\":\"2\",\"your_answer\":[\"2\"]},{\"object_id\":\"40\",\"your_answer\":[]},{\"object_id\":\"23\",\"your_answer\":[\"23\"]},{\"object_id\":\"23\",\"your_answer\":[\"22\",\"1\",\"2\",\"42\",\"23\"]},{\"object_id\":\"37\",\"your_answer\":[\"37\"]},{\"object_id\":\"1\",\"your_answer\":[\"1\"]},{\"object_id\":\"2\",\"your_answer\":[\"2\"]},{\"object_id\":\"43\",\"your_answer\":null}],\"firstCorrect\":6,\"Correct\":8,\"questions_num\":10}]}', '{\"test\":[{\"questions\":[{\"object_id\":\"32\",\"your_answer_id\":\"32\",\"times\":\"00:02.31\"},{\"object_id\":\"26\",\"your_answer_id\":\"26\",\"times\":\"00:02.21\"},{\"object_id\":\"24\",\"your_answer_id\":\"24\",\"times\":\"00:02.13\"},{\"object_id\":\"39\",\"your_answer_id\":\"24\",\"times\":\"00:04.14\"},{\"object_id\":\"45\",\"your_answer_id\":\"29\",\"times\":\"00:03.23\"},{\"object_id\":\"24\",\"your_answer_id\":\"24\",\"times\":\"00:01.71\"},{\"object_id\":\"32\",\"your_answer_id\":\"32\",\"times\":\"00:02.24\"},{\"object_id\":\"45\",\"your_answer_id\":\"27\",\"times\":\"00:03.38\"},{\"object_id\":\"24\",\"your_answer_id\":\"24\",\"times\":\"00:01.71\"},{\"object_id\":\"39\",\"your_answer_id\":\"39\",\"times\":\"00:03.32\"}],\"accuracy\":{\"your\":7,\"all\":10},\"completion\":{\"your\":4,\"all\":9},\"response_rate\":50,\"high_frequency_accuracy\":{\"your\":5,\"all\":5},\"low_frequency_accuracy\":{\"your\":0,\"all\":2},\"enviro_id\":\"20\",\"enviro_name\":\"草原動物\",\"usetime\":\"00:26.38\",\"time\":\"2020-11-29 15:5:21\"}]}'),
('test666', '{\"train\":[]}', '{\"practice\":[]}', '{\"test\":[]}');

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
(1, '不給你領獎勵1', '哈哈', '每日任務', '{\"mode\":{\"id\":\"practice\",\"name\":\"練習模式\"},\"counter\":{\"id\":\"once\",\"name\":\"單次\"},\"action\":\"正確次數\",\"times\":\"0\",\"enviro\":null,\"object\":null}', '[{\"type\":\"money\",\"value\":\"100\"},{\"type\":\"entity\",\"gg\":{\"no\":\"1\",\"type\":\"hair\"},\"mm\":{\"no\":\"1\",\"type\":\"hair\"}},{\"gg\":{\"no\":\"5\",\"type\":\"clothes\"},\"mm\":{\"no\":\"6\",\"type\":\"clothes\"},\"type\":\"entity\"}]'),
(2, '不給你領獎勵2', '哈哈', '成長任務', '{\"mode\":{\"id\":\"practice\",\"name\":\"練習模式\"},\"counter\":{\"id\":\"once\",\"name\":\"單次\"},\"action\":\"正確次數\",\"times\":\"20\",\"enviro\":null,\"object\":null}', '[{\"type\":\"money\",\"value\":\"100\"}]'),
(7, '廚房-剪刀-訓練!', '於訓練模式的廚房情境中完整聆聽剪刀聲音5次', '每日任務', '{\"mode\":{\"id\":\"train\",\"name\":\"訓練模式\"},\"counter\":{\"id\":\"once\",\"name\":\"單次\"},\"action\":\"聆聽次數\",\"times\":\"5\",\"enviro\":\"1\",\"object\":\"43\"}', '[{\"type\":\"money\",\"value\":\"100\"}]'),
(8, '熟悉浴室情境', '於訓練模式的浴室情境中完整聆聽任意聲音100次', '成長任務', '{\"mode\":{\"id\":\"train\",\"name\":\"訓練模式\"},\"counter\":{\"id\":\"once\",\"name\":\"單次\"},\"action\":\"聆聽次數\",\"times\":\"100\",\"object\":null,\"enviro\":\"18\"}', '[{\"type\":\"money\",\"value\":\"100\"},{\"gg\":{\"no\":\"1\",\"type\":\"bottoms\"},\"mm\":{\"no\":\"5\",\"type\":\"hair\"},\"type\":\"entity\"}]'),
(9, '每日3測', '於測驗模式的任意情境中完整完成測驗', '每日任務', '{\"mode\":{\"id\":\"test\",\"name\":\"測驗模式\"},\"counter\":{\"id\":\"once\",\"name\":\"單次\"},\"action\":\"遊玩次數\",\"times\":\"3\",\"enviro\":null,\"object\":null}', '[{\"type\":\"money\",\"value\":\"100\"}]'),
(10, '在廚房中如魚得水', '於測驗模式的廚房情境正確率達到90%以上', '成長任務', '{\"mode\":{\"id\":\"test\",\"name\":\"測驗模式\"},\"counter\":{\"id\":\"once\",\"name\":\"單次\"},\"action\":\"正確率\",\"times\":\"90\",\"enviro\":\"1\",\"object\":null}', '[{\"type\":\"money\",\"value\":\"100\"},{\"gg\":{\"no\":\"5\",\"type\":\"bottoms\"},\"mm\":{\"no\":\"2\",\"type\":\"bottoms\"},\"type\":\"entity\"}]'),
(11, '熟悉一半的浴室', '於測驗模式的浴室情境中正確率達到50%', '成長任務', '{\"mode\":{\"id\":\"test\",\"name\":\"測驗模式\"},\"counter\":{\"id\":\"once\",\"name\":\"單次\"},\"action\":\"正確率\",\"times\":\"50\",\"enviro\":\"18\",\"object\":null}', '[{\"type\":\"money\",\"value\":\"100\"}]'),
(14, '草原一遊', '於草原情境完整遊玩測驗模式一次', '每日任務', '{\"mode\":{\"id\":\"test\",\"name\":\"測驗模式\"},\"counter\":{\"id\":\"once\",\"name\":\"單次\"},\"action\":\"遊玩次數\",\"times\":\"1\",\"object\":null,\"enviro\":\"20\"}', '[{\"type\":\"money\",\"value\":\"100\"}]'),
(15, '練習模式&剪刀', '於練習模式的廚房情境中累積答對剪刀物件10次', '每日任務', '{\"mode\":{\"id\":\"practice\",\"name\":\"練習模式\"},\"counter\":{\"id\":\"total\",\"name\":\"累計\"},\"action\":\"正確次數\",\"times\":\"3\",\"enviro\":\"1\",\"object\":\"43\"}', '[{\"type\":\"money\",\"value\":\"100\"},{\"gg\":{\"no\":\"4\",\"type\":\"clothes\"},\"mm\":{\"no\":\"1\",\"type\":\"clothes\"},\"type\":\"entity\"}]'),
(16, '練習模式&瓶子', '於練習模式的廚房情境中累積答對瓶子物件100次', '成長任務', '{\"mode\":{\"id\":\"practice\",\"name\":\"練習模式\"},\"counter\":{\"id\":\"total\",\"name\":\"累計\"},\"action\":\"正確次數\",\"times\":\"3\",\"enviro\":\"1\",\"object\":\"22\"}', '[{\"type\":\"money\",\"value\":\"100\"}]'),
(17, '練習模式&剪刀', '於練習模式的廚房情境中單場答對剪刀物件3次', '每日任務', '{\"mode\":{\"id\":\"practice\",\"name\":\"練習模式\"},\"counter\":{\"id\":\"once\",\"name\":\"單次\"},\"action\":\"正確次數\",\"times\":\"3\",\"enviro\":\"1\",\"object\":\"43\"}', '[{\"type\":\"money\",\"value\":\"100\"}]');

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
  `scale` text COLLATE utf8_bin NOT NULL,
  `angle` varchar(3) COLLATE utf8_bin NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 傾印資料表的資料 `object`
--

INSERT INTO `object` (`id`, `pic_src`, `sound_src`, `name`, `coordinate`, `size`, `scale`, `angle`) VALUES
(1, '../static/images/enviro/object/knife_4x.png', '6', '菜刀', '387,218', 12, '0.41379310344828', '10'),
(2, '../static/images/enviro/object/pot_4x.png', '8', '沸水', '321,452', 72, '0.799', '0'),
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
(43, '../static/images/enviro/object/剪刀.png', '44', '剪刀', '781,351', 62, '0.0001', '0'),
(44, '../static/images/enviro/object/山羊@2x.png', '84', '山羊', '737,341', 97, '0.91079812206573', '0'),
(45, '../static/images/enviro/object/牛.png', '85', '牛', '741,457', 157, '0.95151515151515', '0'),
(49, '../static/images/enviro/object/果汁機2.png', '83', '果汁機', '617,137', 100, '1.0745', '0');

-- --------------------------------------------------------

--
-- 資料表結構 `roleclothes`
--

CREATE TABLE `roleclothes` (
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
-- 傾印資料表的資料 `roleclothes`
--

INSERT INTO `roleclothes` (`id`, `account`, `gender`, `hair`, `clothes`, `cleft`, `cright`, `bottoms`, `shoe`, `sright`, `h_deco`, `wrist_deco`) VALUES
(1, 'test', 'mm', '4,3,2', '3', '3', '3', '1', '1', '1', '2', '1'),
(2, 'test', 'gg', '4', '3', '3', '3', '1', '1', '1', '2', '1'),
(16, '55', 'mm', '1,3,6', '1,2', '1,2', '1,2', '2', '1', '1', '', ''),
(17, '33', 'gg', '1,3', '4,3,1,5', '4,3,1,5', '4,3,1,5', '3,2', '1,2', '1,2', '', '1'),
(18, 'test002', 'gg', '3,1', '4,5', '4', '4', '3', '2', '2', '', '1'),
(19, 'test055', 'gg', '3', '1,5', '1', '1', '2', '1', '1', '', '1'),
(20, 'test0001', 'gg', '2', '2', '2', '2', '4', '1', '1', '', '1'),
(21, 'acs107123', 'gg', '3', '4', '4', '4', '2', '1', '1', '', '1'),
(22, 'test666', 'mm', '2', '2', '2', '2', '2', '1', '1', '2', '1'),
(23, 'test1111', 'gg', '1', '2', '2', '2', '3', '1', '1', '', '1');

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
('33', '33', 'gg', '2020-09-03', 'newPlayer', 0, 'Character/hair/gg/hair1_gg', 'Character/clothes/clothes4_gg', 'Character/cleft/c4_l_gg', 'Character/cright/c4_r_gg', 'Character/bottoms/pant3_gg', 'Character/sleft/shoe2_l_gg', 'Character/sright/s2_r_gg', '', 'Character/wrist_deco/wrist_deco1_gg_mm'),
('55', '55', 'mm', '2020-09-02', 'newPlayer', 0, 'Character/hair/mm/hair1', 'Character/clothes/clothes1_mm', 'Character/cleft/c1_l_mm', 'Character/cright/c1_r_mm', 'Character/bottoms/skirt2_mm', 'Character/sleft/shoe1_l_mm', 'Character/sright/s1_r_mm', '', ''),
('ACS106106', 'ACS106106', 'gg', '2020-11-18', 'newPlayer', 0, '', '', '', '', '', '', '', '', ''),
('acs107123', 'acs107123', 'gg', '2020-11-12', 'newPlayer', 0, 'Character/hair/gg/hair3_gg', 'Character/clothes/clothes4_gg', 'Character/cleft/c4_l_gg', 'Character/cright/c4_r_gg', 'Character/bottoms/pant2_gg', 'Character/sleft/shoe1_l_gg', 'Character/sright/s1_r_gg', '', 'Character/wrist_deco/wrist_deco1_gg_mm'),
('test', 'EL', 'mm', '2020-08-27', 'newPlayer', 0, 'Character/hair/mm/hair4', 'Character/clothes/clothes3_mm', 'Character/cleft/c3_l_mm', 'Character/cright/c3_r_mm', 'Character/bottoms/skirt1_mm', 'Character/sleft/shoe1_l_mm', 'Character/sright/s1_r_mm', 'Character/h_deco/h_deco2_mm', 'Character/wrist_deco/wrist_deco1_gg_mm'),
('test0001', 'test0001', 'gg', '2020-11-12', 'newPlayer', 0, 'Character/hair/gg/hair2_gg', 'Character/clothes/clothes2_gg', 'Character/cleft/c2_l_gg', 'Character/cright/c2_r_gg', 'Character/bottoms/pant4_gg', 'Character/sleft/shoe1_l_gg', 'Character/sright/s1_r_gg', '', 'Character/wrist_deco/wrist_deco1_gg_mm'),
('test002', '小朋友', 'gg', '2020-09-27', 'newPlayer', 0, 'Character/hair/gg/hair3_gg', 'Character/clothes/clothes4_gg', 'Character/cleft/c4_l_gg', 'Character/cright/c4_r_gg', '', 'Character/sleft/shoe2_l_gg', 'Character/sright/s2_r_gg', '', 'Character/wrist_deco/wrist_deco1_gg_mm'),
('test055', 'test055', 'gg', '2020-09-28', 'newPlayer', 0, 'Character/hair/gg/hair3_gg', 'Character/clothes/clothes1_gg', 'Character/cleft/c1_l_gg', 'Character/cright/c1_r_gg', 'Character/bottoms/pant2_gg', 'Character/sleft/shoe1_l_gg', 'Character/sright/s1_r_gg', '', 'Character/wrist_deco/wrist_deco1_gg_mm'),
('test1111', 'test1111', 'gg', '2020-11-29', 'newPlayer', 0, 'Character/hair/gg/hair1_gg', 'Character/clothes/clothes2_gg', 'Character/cleft/c2_l_gg', 'Character/cright/c2_r_gg', 'Character/bottoms/pant3_gg', 'Character/sleft/shoe1_l_gg', 'Character/sright/s1_r_gg', '', 'Character/wrist_deco/wrist_deco1_gg_mm'),
('test666', 'test666', 'mm', '2020-11-28', 'newPlayer', 0, 'Character/hair/mm/hair2', 'Character/clothes/clothes2_mm', 'Character/cleft/c2_l_mm', 'Character/cright/c2_r_mm', 'Character/bottoms/skirt2_mm', 'Character/sleft/shoe1_l_mm', 'Character/sright/s1_r_mm', 'Character/h_deco/h_deco2_mm', 'Character/wrist_deco/wrist_deco1_gg_mm');

-- --------------------------------------------------------

--
-- 資料表結構 `train`
--

CREATE TABLE `train` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `question` varchar(50) NOT NULL,
  `creator` varchar(30) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT current_timestamp(),
  `recent_edit_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `train`
--

INSERT INTO `train` (`id`, `name`, `question`, `creator`, `create_time`, `recent_edit_time`) VALUES
(1, '444', '3,9', 'qqq', '2018-09-22 23:12:09', '2018-12-07 11:05:28'),
(2, '測試', '2,10,11,12', 'Ian', '2018-09-23 13:44:51', '2018-09-23 13:44:59'),
(13, 'rr', '1,14,17,20', 'qq', '2018-12-04 22:35:40', '2018-12-05 16:44:38'),
(14, '測試', '2,3,5,6', '測試1', '2018-12-04 23:04:33', '2018-12-04 23:04:33'),
(17, 'try', '3,13,26,37,2,5', 'Kelly', '2018-12-05 16:52:34', '2018-12-07 09:46:09');

-- --------------------------------------------------------

--
-- 資料表結構 `trainhistory`
--

CREATE TABLE `trainhistory` (
  `id` int(11) NOT NULL,
  `name` text CHARACTER SET utf8 NOT NULL,
  `data` text CHARACTER SET utf8 NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 傾印資料表的資料 `trainhistory`
--

INSERT INTO `trainhistory` (`id`, `name`, `data`, `time`) VALUES
(12, '訪客', '菜刀/0;沸水/0;洗碗/1;烤麵包機/1;瓶子/0', '2019-11-05 00:24:20'),
(13, '訪客', '菜刀/2;沸水/0;洗碗/2;烤麵包機/3;瓶子/0', '2019-11-05 05:55:50'),
(16, '訪客', '菜刀/1;沸水/1;洗碗/1;烤麵包機/1;瓶子/1', '2019-11-25 23:35:14'),
(18, '訪客', '菜刀/1;沸水/1;洗碗/1;烤麵包機/1;瓶子/1', '2019-11-28 00:39:40'),
(21, '訪客', '菜刀/1;沸水/1;洗碗/1;烤麵包機/1;瓶子/1', '2019-11-29 12:20:08'),
(23, '訪客', '菜刀/1;沸水/1;洗碗/1;烤麵包機/1;瓶子/1', '2019-11-29 12:41:46'),
(81, '許浡華', '菜刀/0;沸水/0;洗碗/0;烤麵包機/1;瓶子/0', '2019-12-02 13:13:27'),
(83, '許浡華', '貓/1', '2019-12-02 14:11:44'),
(84, '王藝名', '菜刀/0;沸水/1;洗碗/0;烤麵包機/0;瓶子/1;掃地/1;吊扇/1', '2019-12-03 06:23:12'),
(85, '陳科任', '菜刀/1;沸水/1;洗碗/2;烤麵包機/2;瓶子/3;掃地/1;吊扇/2', '2019-12-03 06:26:11'),
(86, '花', '菜刀/5;沸水/1;洗碗/0;烤麵包機/0;瓶子/1;掃地/4;吊扇/2', '2019-12-03 06:29:04'),
(87, '陳奕穎', '菜刀/1;沸水/1;洗碗/1;烤麵包機/1;瓶子/1;掃地/1;吊扇/1', '2019-12-03 10:52:27'),
(88, '影片', '菜刀/1;沸水/1;洗碗/1;烤麵包機/1;瓶子/1;掃地/1;吊扇/1', '2019-12-04 01:27:37'),
(89, '111', '水龍頭/6;刷牙/0;毛巾/0;馬桶/0', '2019-12-05 09:44:51'),
(90, 'RIYA', '菜刀/0;沸水/1;洗碗/1;烤麵包機/1;瓶子/1;掃地/1;吊扇/5;吸塵器/2;果汁機/1;剪刀/1', '2019-12-06 00:39:29'),
(91, '111', '菜刀/1;沸水/1;洗碗/1;烤麵包機/2;瓶子/2;掃地/1;吊扇/1;吸塵器/1;果汁機/1;剪刀/0', '2019-12-06 00:55:18'),
(92, '111', '水龍頭/1;刷牙/1;毛巾/1;馬桶/1;木櫃/0', '2019-12-06 00:56:51'),
(93, '111', '貓/1;烏鴉/1;狗/1;貓頭鷹/1;獅子/1;老鼠/1;樹蛙/1;山羊/1;牛/1', '2019-12-06 00:57:07'),
(94, '111', '菜刀/0;沸水/0;洗碗/3;烤麵包機/1;瓶子/2;掃地/1;吊扇/0;吸塵器/1;果汁機/0;剪刀/0', '2019-12-06 01:32:19'),
(95, '111', '', '2019-12-06 01:40:23'),
(96, '111', '', '2019-12-06 01:42:56'),
(97, '111', '', '2019-12-06 02:09:24'),
(98, '111', '菜刀/0;沸水/1;洗碗/0;烤麵包機/0;瓶子/0;掃地/0;吊扇/0;吸塵器/1;果汁機/0;剪刀/0', '2019-12-06 02:12:59'),
(99, '111', '菜刀/0;沸水/1;洗碗/0;烤麵包機/0;瓶子/0;掃地/0;吊扇/0;吸塵器/0;果汁機/0;剪刀/0', '2019-12-06 02:17:41'),
(100, '111', '菜刀/0;沸水/1;洗碗/0;烤麵包機/0;瓶子/0;掃地/0;吊扇/0;吸塵器/0;果汁機/0;剪刀/0', '2019-12-06 02:21:40'),
(101, '111', '菜刀/0;沸水/1;洗碗/1;烤麵包機/0;瓶子/0;掃地/0;吊扇/0;吸塵器/0;果汁機/0;剪刀/0', '2019-12-06 02:23:51'),
(102, '訪客', '', '2019-12-06 02:26:44'),
(103, '111', '菜刀/0;沸水/1;洗碗/0;烤麵包機/0;瓶子/0;掃地/0;吊扇/0;吸塵器/0;果汁機/0;剪刀/0', '2019-12-06 02:27:42'),
(104, '111', '菜刀/0;沸水/1;洗碗/0;烤麵包機/0;瓶子/0;掃地/0;吊扇/0;吸塵器/0;果汁機/0;剪刀/0', '2019-12-06 02:31:08'),
(105, '111', '菜刀/0;沸水/1;洗碗/0;烤麵包機/0;瓶子/0;掃地/0;吊扇/0;吸塵器/0;果汁機/0;剪刀/0', '2019-12-06 02:34:50'),
(106, '111', '菜刀/0;沸水/0;洗碗/0;烤麵包機/1;瓶子/0;掃地/0;吊扇/0;吸塵器/0;果汁機/0;剪刀/0', '2019-12-06 02:41:23'),
(107, '111', '菜刀/0;沸水/0;洗碗/1;烤麵包機/0;瓶子/0;掃地/0;吊扇/0;吸塵器/0;果汁機/0;剪刀/0', '2019-12-06 02:45:56'),
(108, '111', '菜刀/0;沸水/1;洗碗/0;烤麵包機/0;瓶子/0;掃地/0;吊扇/0;吸塵器/0;果汁機/0;剪刀/0', '2019-12-06 02:49:40'),
(109, '111', '菜刀/0;沸水/1;洗碗/0;烤麵包機/0;瓶子/0;掃地/0;吊扇/0;吸塵器/0;果汁機/0;剪刀/0', '2019-12-06 02:55:23'),
(110, '111', '菜刀/0;沸水/1;洗碗/0;烤麵包機/0;瓶子/0;掃地/0;吊扇/0;吸塵器/0;果汁機/0;剪刀/0', '2019-12-06 03:05:19'),
(111, '111', '菜刀/0;沸水/1;洗碗/0;烤麵包機/0;瓶子/0;掃地/0;吊扇/0;吸塵器/0;果汁機/0;剪刀/0', '2019-12-06 03:10:31'),
(112, '111', '菜刀/0;沸水/1;洗碗/0;烤麵包機/0;瓶子/0;掃地/0;吊扇/0;吸塵器/0;果汁機/0;剪刀/0', '2019-12-06 03:22:54'),
(113, '111', '菜刀/0;沸水/1;洗碗/0;烤麵包機/0;瓶子/0;掃地/0;吊扇/0;吸塵器/0;果汁機/0;剪刀/0', '2019-12-06 03:28:02'),
(114, '111', '貓/1;烏鴉/1;狗/1;貓頭鷹/1;獅子/11;老鼠/1;樹蛙/1;山羊/1;牛/2', '2019-12-06 03:30:41'),
(115, '111', '水龍頭/2;刷牙/1;毛巾/2;馬桶/1;木櫃/3', '2019-12-06 03:33:03'),
(116, '111', '菜刀/0;沸水/1;洗碗/0;烤麵包機/1;瓶子/0;掃地/1;吊扇/0;吸塵器/0;果汁機/0;剪刀/0', '2019-12-06 03:39:12'),
(117, '建霖', '菜刀/0;沸水/0;洗碗/0;烤麵包機/0;瓶子/0;掃地/1;吊扇/0;吸塵器/0;果汁機/0;剪刀/0', '2019-12-08 06:13:19'),
(118, '訪客', '菜刀/0;沸水/0;洗碗/1;烤麵包機/0;瓶子/0;掃地/0;吊扇/0;吸塵器/0;果汁機/0;剪刀/0', '2019-12-27 17:51:37'),
(119, '訪客', '', '2020-01-13 03:01:06'),
(120, '訪客', '貓/0;烏鴉/0;狗/0;貓頭鷹/1;獅子/0;老鼠/0;樹蛙/0;山羊/0;牛/0', '2020-01-13 12:20:40'),
(121, '訪客', '貓/0;烏鴉/0;狗/0;貓頭鷹/1;獅子/0;老鼠/0;樹蛙/0;山羊/0;牛/0', '2020-01-13 12:21:00'),
(122, '訪客', '菜刀/0;沸水/0;洗碗/0;烤麵包機/0;瓶子/0;掃地/0;吊扇/0;吸塵器/2;果汁機/0;剪刀/0', '2020-01-13 16:02:23'),
(123, '訪客', '菜刀/0;沸水/0;洗碗/0;烤麵包機/1;瓶子/0;掃地/0;吊扇/0;吸塵器/0;果汁機/0;剪刀/0', '2020-02-21 09:32:10'),
(124, '訪客', '菜刀/0;沸水/0;洗碗/0;烤麵包機/0;瓶子/1;掃地/2;吊扇/1;吸塵器/0;果汁機/0;剪刀/0', '2020-02-23 10:21:35'),
(125, '訪客', '水龍頭/3;刷牙/11;毛巾/10;馬桶/1;木櫃/0', '2020-03-05 10:20:40'),
(126, '訪客', '菜刀/0;沸水/1;洗碗/0;烤麵包機/0;瓶子/5;掃地/3;吊扇/0;吸塵器/1;果汁機/0;剪刀/1', '2020-03-05 10:24:04'),
(127, '2232', '菜刀/0;沸水/0;洗碗/0;烤麵包機/2;瓶子/0;掃地/0;吊扇/0;吸塵器/0;果汁機/0;剪刀/0', '2020-03-12 06:06:05'),
(128, '訪客', '菜刀/0;沸水/0;洗碗/0;烤麵包機/0;瓶子/0;掃地/0;吊扇/0;吸塵器/0;果汁機/0;剪刀/0', '2020-03-16 16:32:13'),
(129, '訪客', '菜刀/0;沸水/0;洗碗/0;烤麵包機/0;瓶子/0;掃地/0;吊扇/0;吸塵器/0;果汁機/0;剪刀/0', '2020-03-26 06:27:01'),
(130, '訪客', '菜刀/0;沸水/0;洗碗/1;烤麵包機/0;瓶子/0;掃地/0;吊扇/0;吸塵器/0;果汁機/0;剪刀/0', '2020-03-26 06:59:44');

-- --------------------------------------------------------

--
-- 資料表結構 `user`
--

CREATE TABLE `user` (
  `account` varchar(12) NOT NULL,
  `password` varchar(16) NOT NULL,
  `name` varchar(12) NOT NULL,
  `mail` varchar(30) NOT NULL,
  `creator` varchar(12) NOT NULL,
  `identity` varchar(3) NOT NULL,
  `tags` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `user`
--

INSERT INTO `user` (`account`, `password`, `name`, `mail`, `creator`, `identity`, `tags`) VALUES
('106110', '11', 'jack', 'we@gmail.com', '', '學生', ''),
('33', '44', 'dog', 'd@gmail.com', '', '教師', ''),
('55', '66', 'cat', 'c@gmail.com', '', '學生', ''),
('ACS106106', 'ACS106106', '大灰包', '大灰包@gmail.com', '', '學生', ''),
('acs107123', 'acs107123', 'Yoga', 'acs107123@gm.ntcu.edu.tw', '', '學生', ''),
('test', '1234', 'test', '123@hello.com', '', '學生', ''),
('test0001', '1234', '測試人員1', 'test0001@gmail.com', '', '學生', ''),
('test002', '1234', 'test002', 'dadad@dwa.f', '', '管理者', ''),
('test055', '1234', 'test00', 'fefsf@dwad.fe', 'test002', '學生', '台中教育大學,三甲'),
('test05555', '1234', 'test00555', 'fefsf@dwad.fe', 'test002', '學生', '台中教育大學,三甲'),
('test1111', '1234', 'test1111', 'dwadda@gdad.fes', '', '學生', ''),
('test666', '1234', '測試帳號000', 'dawdad@gmailc.mo', '', '教師', '');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `data`
--
ALTER TABLE `data`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `enviro`
--
ALTER TABLE `enviro`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `envirohistory`
--
ALTER TABLE `envirohistory`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `exam`
--
ALTER TABLE `exam`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`account`);

--
-- 資料表索引 `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `learning`
--
ALTER TABLE `learning`
  ADD PRIMARY KEY (`account`);

--
-- 資料表索引 `mission`
--
ALTER TABLE `mission`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `object`
--
ALTER TABLE `object`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `roleclothes`
--
ALTER TABLE `roleclothes`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- 資料表索引 `roledata`
--
ALTER TABLE `roledata`
  ADD PRIMARY KEY (`account`);

--
-- 資料表索引 `train`
--
ALTER TABLE `train`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `trainhistory`
--
ALTER TABLE `trainhistory`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`account`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `data`
--
ALTER TABLE `data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `enviro`
--
ALTER TABLE `enviro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `envirohistory`
--
ALTER TABLE `envirohistory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `exam`
--
ALTER TABLE `exam`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `mission`
--
ALTER TABLE `mission`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `object`
--
ALTER TABLE `object`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `roleclothes`
--
ALTER TABLE `roleclothes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `train`
--
ALTER TABLE `train`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `trainhistory`
--
ALTER TABLE `trainhistory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
