-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2025 at 06:08 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `creatorId` int(11) NOT NULL,
  `price` int(11) DEFAULT NULL,
  `courseTypeId` char(36) DEFAULT NULL,
  `link` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `title`, `description`, `creatorId`, `price`, `courseTypeId`, `link`, `image`, `createdAt`, `updatedAt`) VALUES
(10, 'Khóa học Giao tiếp tiếng Anh cơ bản', '<h2 id=\"h2title_0\"><strong>1. GIỚI THIỆU LỘ TRÌNH HỌC TOEIC 4 KỸ NĂNG A+</strong></h2>\n<p>► <strong>Mục tiêu</strong>: 400 - 450+ Nghe Đọc; 70-110+ Speaking; 70-110+ Writing</p>\n<p>► <strong>Đối tượng:</strong> Tất cả những bạn chưa học tiếng Anh bao giờ hoặc mất gốc tiếng Anh mặc dù đã học nhiều năm nhưng kiến thức cơ bản vẫn rất kém, khả năng nghe còn yếu.</p>\n<p>► <strong>Khóa học:</strong> Trải qua 2 khóa học tại Ms Hoa TOEIC đó là: Pre TOEIC, TOEIC A+.</p>\n<p>► <strong>Mục tiêu đầu ra:</strong> 400 - 450+ Nghe Đọc; 70-110+ Speaking; 70-110+ Writing sau 4 tháng.</p>\n<p>► <strong>Cam kết trung tâm:</strong> </p>\n<ul>\n<li>Mất gốc lấy lại căn bản, tạo cảm hứng mỗi khi đến lớp.</li>\n<li>Đạt 450 - 500+ Nghe Đọc; 70-110+ Speaking; 70-110+ Writing sau khóa học.</li>\n<li>Hoàn thiện đầy đủ 4 kỹ năng Nghe - Nói - Đọc - Viết.</li>\n<li>Học lại MIỄN PHÍ nếu học viên không đạt điểm đầu ra.</li>\n</ul>\n<p>► <strong>Cam kết học viên:</strong> Để đạt điểm đầu ra học viên cần thực hiện</p>\n<ul>\n<li>Đi học đầy đủ các buổi trên lớp.</li>\n<li>Làm bài tập về nhà đầy đủ và chăm chỉ.</li>\n<li>Trên lớp chăm chỉ học tập theo hướng dẫn của giảng viên.</li>\n</ul>', 12, 199000, '550e8400-e29b-41d4-a716-446655440000', 'https://example.com/khoa-hoc/giao-tiep', 'http://res.cloudinary.com/dmcewmxyx/image/upload/v1747410273/dpshopvn/hehmanb4okjndeiiudzf.jpg', '2025-05-16 14:26:02', '2025-05-16 15:44:58'),
(11, 'Toeic', '<p>Lộ trình học TOEIC 4 kỹ năng</p>\n<p><a href=\"https://docs.google.com/forms/d/e/1FAIpQLSekC5BxKKAvq1ip3gAPXFeZJZ443EcP7JnD_07065BmLJXAEw/viewform\" target=\"_blank\" rel=\"noopener\"><img src=\"https://www.anhngumshoa.com/uploads/images/userfiles/tu_van.jpeg\" alt=\"\"></a></p>\n<div class=\"table-responsive2\">\n<table class=\"table table-bordered table-striped\" border=\"1\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr>\n<td colspan=\"2\">\n<h2 id=\"h2title_1\" align=\"center\"><strong>LỘ TRÌNH HỌC TOEIC 4 KỸ NĂNG A+</strong></h2>\n</td>\n</tr>\n<tr>\n<td><strong>Giai đoạn 1</strong></td>\n<td>\n<p><strong>PRE TOEIC</strong></p>\n<p>► <strong>Điều kiện:</strong> Không yêu cầu đầu vào. Phù hợp với các bạn học viên mất gốc Tiếng Anh, chưa tiếp xúc nhiều với tiếng Anh nói chung và TOEIC nói riêng, các bạn học viên có tiếp xúc với tiếng Anh nhưng nền tảng chưa vững chắc.</p>\n<p>► <strong>Mục tiêu</strong>: <strong>300-350 TOEIC</strong></p>\n<p>► <strong>Giáo viên:</strong> 1 – 2 Giảng viên đứng lớp. Tất cả giáo viên có kinh nghiệm giảng dạy TOEIC 3 năm trở lên, chuyên môn cao và có phương pháp dạy năng động, sáng tạo, truyền cảm hứng, đam mê Tiếng Anh.</p>\n<p>► <strong>Thời gian khóa học:</strong> Hơn 02 tháng (24 buổi học, 1 tuần 03 buổi, 1 buổi 1.5 tiếng).</p>\n<p>► <strong>Nội dung:</strong> Chia làm 2 phần; 11 buổi Listening, 11 buổi Reading, 01 buổi Mid Term và 01 buổi final Term.</p>\n<p>► <strong>Giáo trình:</strong> Giáo trình do Cô Hoa và Đội ngũ Giảng viên Ms Hoa TOEIC biên soạn và tổng hợp chọn lọc từ các nguồn uy tín, thiết kế theo chuẩn Format đề thi TOEIC.</p>\n<p>► <strong>Hoạt động ngoại khóa:</strong> Tham gia CLB tiếng Anh Paint Yourself; event chia sẻ kinh nghiệm luyện thi Toeic miễn phí.</p>\n</td>\n</tr>\n</tbody>\n</table>\n</div>\n<p> </p>', 12, 500000, 'baacee44-322b-11f0-a184-346f24116792', 'https://www.anhngumshoa.com/khoa-toeic-4-ky-nang-a-plus-news37805.html', 'http://res.cloudinary.com/dmcewmxyx/image/upload/v1747410796/dpshopvn/s8slugnedt41wzwnnmfn.jpg', '2025-05-16 15:53:31', '2025-05-16 15:53:59');

-- --------------------------------------------------------

--
-- Table structure for table `course_types`
--

CREATE TABLE `course_types` (
  `id` char(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_types`
--

INSERT INTO `course_types` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'TOEIC Beginner', '2025-05-15 10:05:49', '2025-05-15 10:05:49'),
('550e8400-e29b-41d4-a716-446655440001', 'TOEIC Advanced', '2025-05-15 10:05:49', '2025-05-15 10:05:49'),
('550e8400-e29b-41d4-a716-446655440002', 'TOEIC Skills', '2025-05-15 10:05:49', '2025-05-15 10:05:49'),
('baacee44-322b-11f0-a184-346f24116792', 'loại dốt 2', '2025-05-16 07:59:44', '2025-05-16 07:59:44');

-- --------------------------------------------------------

--
-- Table structure for table `frames`
--

CREATE TABLE `frames` (
  `id` int(11) NOT NULL,
  `frame_number` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `frames`
--

INSERT INTO `frames` (`id`, `frame_number`, `title`, `content`, `created_at`) VALUES
(1, 27, 'TOEIC Frame 27', 'Learn vocabulary for TOEIC Frame 27', '2025-05-17 12:37:00'),
(2, 28, 'TOEIC Frame 28', 'Learn vocabulary for TOEIC Frame 28', '2025-05-17 12:37:00'),
(3, 29, 'TOEIC Frame 29', 'Learn vocabulary for TOEIC Frame 29', '2025-05-17 12:37:00'),
(4, 30, 'TOEIC Frame 30', 'Learn vocabulary for TOEIC Frame 30', '2025-05-17 12:37:00'),
(5, 31, 'TOEIC Frame 31', 'Learn vocabulary for TOEIC Frame 31', '2025-05-17 12:37:00'),
(6, 32, 'TOEIC Frame 32', 'Learn vocabulary for TOEIC Frame 32', '2025-05-17 12:37:00'),
(7, 33, 'TOEIC Frame 33', 'Learn vocabulary for TOEIC Frame 33', '2025-05-17 12:37:00'),
(8, 34, 'TOEIC Frame 34', 'Learn vocabulary for TOEIC Frame 34', '2025-05-17 12:37:00'),
(9, 35, 'TOEIC Frame 35', 'Learn vocabulary for TOEIC Frame 35', '2025-05-17 12:37:00'),
(10, 36, 'TOEIC Frame 36', 'Learn vocabulary for TOEIC Frame 36', '2025-05-17 12:37:00'),
(11, 37, 'TOEIC Frame 37', 'Learn vocabulary for TOEIC Frame 37', '2025-05-17 12:37:00'),
(12, 38, 'TOEIC Frame 38', 'Learn vocabulary for TOEIC Frame 38', '2025-05-17 12:37:00'),
(13, 39, 'TOEIC Frame 39', 'Learn vocabulary for TOEIC Frame 39', '2025-05-17 12:37:00'),
(14, 40, 'TOEIC Frame 40', 'Learn vocabulary for TOEIC Frame 40', '2025-05-17 12:37:00'),
(15, 41, 'TOEIC Frame 41', 'Learn vocabulary for TOEIC Frame 41', '2025-05-17 12:37:00'),
(16, 42, 'TOEIC Frame 42', 'Learn vocabulary for TOEIC Frame 42', '2025-05-17 12:37:00'),
(17, 43, 'TOEIC Frame 43', 'Learn vocabulary for TOEIC Frame 43', '2025-05-17 12:37:00'),
(18, 44, 'TOEIC Frame 44', 'Learn vocabulary for TOEIC Frame 44', '2025-05-17 12:37:00');

-- --------------------------------------------------------

--
-- Table structure for table `frame_vocabulary`
--

CREATE TABLE `frame_vocabulary` (
  `id` int(11) NOT NULL,
  `frame_id` int(11) NOT NULL,
  `vocab_id` int(11) NOT NULL,
  `position` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `frame_vocabulary`
--

INSERT INTO `frame_vocabulary` (`id`, `frame_id`, `vocab_id`, `position`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 2),
(3, 1, 3, 3),
(4, 2, 3, 1),
(5, 2, 4, 2),
(6, 2, 5, 3),
(7, 3, 6, 1),
(8, 3, 7, 2),
(9, 3, 8, 3),
(10, 4, 9, 1),
(11, 4, 10, 2),
(12, 4, 11, 3),
(13, 5, 12, 1),
(14, 5, 13, 2),
(15, 5, 14, 3),
(16, 6, 15, 1),
(17, 6, 16, 2),
(18, 6, 17, 3),
(19, 7, 18, 1),
(20, 7, 19, 2),
(21, 7, 20, 3),
(22, 8, 21, 1),
(23, 8, 22, 2),
(24, 8, 23, 3),
(25, 9, 24, 1),
(26, 9, 25, 2),
(27, 9, 1, 3),
(28, 10, 2, 1),
(29, 10, 3, 2),
(30, 10, 4, 3),
(31, 11, 5, 1),
(32, 11, 6, 2),
(33, 11, 7, 3),
(34, 12, 8, 1),
(35, 12, 9, 2),
(36, 12, 10, 3),
(37, 13, 11, 1),
(38, 13, 12, 2),
(39, 13, 13, 3),
(40, 14, 14, 1),
(41, 14, 15, 2),
(42, 14, 16, 3),
(43, 15, 17, 1),
(44, 15, 18, 2),
(45, 15, 19, 3),
(46, 16, 20, 1),
(47, 16, 21, 2),
(48, 16, 22, 3),
(49, 17, 23, 1),
(50, 17, 24, 2),
(51, 17, 25, 3),
(52, 18, 1, 1),
(53, 18, 2, 2),
(54, 18, 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `lessons`
--

CREATE TABLE `lessons` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lessons`
--

INSERT INTO `lessons` (`id`, `course_id`, `title`, `content`, `createdAt`, `updatedAt`) VALUES
(5, 11, 'LESSON: 1', 'Giao tiếp cơ bản', '2025-05-16 15:59:45', '2025-05-16 22:59:45'),
(211, 11, 'LESSON: 2', 'LESSON: 2', '2025-05-16 16:00:07', '2025-05-16 23:00:07');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','teacher','student') NOT NULL,
  `emailVerified` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `avatar`, `password`, `role`, `emailVerified`, `createdAt`, `updatedAt`) VALUES
(6, 'datp1907@gmail.com', 'datp1907@gmail.com', NULL, '$2b$10$NvPi4doQAMGVdVdxhBPoAOdpDW8p3hV0xANW9APG3FR62R5iieiua', 'student', 0, '2025-05-16 05:06:03', '2025-05-16 05:06:26'),
(8, 'test@gmail.com', 'test@gmail.com', NULL, '$2b$10$N9b.jg8v9XXPWXAZthj3nuhWOAJc1K.BuF/uue5whVZBBza51S656', 'admin', 0, '2025-05-16 07:09:32', '2025-05-16 11:48:39'),
(9, 'anhtai', 'thaianhtai167@gmail.com', NULL, '$2b$10$0a7.QLHCxoncNaLLxnFZxeaYp4daX6mkUz0aCA3H8nqoF9T9fWnq.', 'admin', 0, '2025-05-16 07:12:01', '2025-05-16 08:13:07'),
(10, 'daicatai', 'tes1@gmail.com', NULL, '$2b$10$.TRHBRU4/gdmbkVglSpgL.IIc6.mHODjaGloqkX4n2gbVtbcKnSFa', 'student', 0, '2025-05-16 07:26:20', '2025-05-16 08:14:26'),
(11, 'daicatai', 'test10@gmail.com', NULL, '$2b$10$xDT00ILe6riv7XbuPvkrFuEauKKcRHhrA5OM7Bt7gYyyRJ4a33v3G', 'teacher', 0, '2025-05-16 07:28:21', '2025-05-16 14:09:48'),
(12, 'teacher@gmail.com', 'teacher@gmail.com', '/src/assets/image/minigame.png', '$2b$10$odVUpceeVGbiFvvhHIpHw.n9ZirmjD9VsGAJkWuzXMkYo1VnGgh.S', 'teacher', 0, '0000-00-00 00:00:00', '2025-05-16 14:11:42');

-- --------------------------------------------------------

--
-- Table structure for table `vocabulary`
--

CREATE TABLE `vocabulary` (
  `id` int(11) NOT NULL,
  `english_word` varchar(50) NOT NULL,
  `vietnamese_word` varchar(50) NOT NULL,
  `part_of_speech` varchar(20) NOT NULL,
  `image_seed_url` varchar(255) DEFAULT NULL,
  `image_sprout_url` varchar(255) DEFAULT NULL,
  `image_flower_url` varchar(255) DEFAULT NULL,
  `audio_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vocabulary`
--

INSERT INTO `vocabulary` (`id`, `english_word`, `vietnamese_word`, `part_of_speech`, `image_seed_url`, `image_sprout_url`, `image_flower_url`, `audio_url`) VALUES
(1, 'Lemon', 'Chanh', '(Noun)', 'https://example.com/seed_lemon.jpg', 'https://example.com/sprout_lemon.jpg', 'https://example.com/flower_lemon.jpg', 'https://example.com/audio_lemon.mp3'),
(2, 'Apple', 'Táo', '(Noun)', 'https://example.com/seed_apple.jpg', 'https://example.com/sprout_apple.jpg', 'https://example.com/flower_apple.jpg', 'https://example.com/audio_apple.mp3'),
(3, 'Orange', 'Cam', '(Noun)', 'https://example.com/seed_orange.jpg', 'https://example.com/sprout_orange.jpg', 'https://example.com/flower_orange.jpg', 'https://example.com/audio_orange.mp3'),
(4, 'Mango', 'Xoài', '(Noun)', 'https://example.com/seed_mango.jpg', 'https://example.com/sprout_mango.jpg', 'https://example.com/flower_mango.jpg', 'https://example.com/audio_mango.mp3'),
(5, 'Banana', 'Chuối', '(Noun)', 'https://example.com/seed_banana.jpg', 'https://example.com/sprout_banana.jpg', 'https://example.com/flower_banana.jpg', 'https://example.com/audio_banana.mp3'),
(6, 'Grape', 'Nho', '(Noun)', 'https://example.com/seed_grape.jpg', 'https://example.com/sprout_grape.jpg', 'https://example.com/flower_grape.jpg', 'https://example.com/audio_grape.mp3'),
(7, 'Pineapple', 'Dứa', '(Noun)', 'https://example.com/seed_pineapple.jpg', 'https://example.com/sprout_pineapple.jpg', 'https://example.com/flower_pineapple.jpg', 'https://example.com/audio_pineapple.mp3'),
(8, 'Watermelon', 'Dưa hấu', '(Noun)', 'https://example.com/seed_watermelon.jpg', 'https://example.com/sprout_watermelon.jpg', 'https://example.com/flower_watermelon.jpg', 'https://example.com/audio_watermelon.mp3'),
(9, 'Strawberry', 'Dâu tây', '(Noun)', 'https://example.com/seed_strawberry.jpg', 'https://example.com/sprout_strawberry.jpg', 'https://example.com/flower_strawberry.jpg', 'https://example.com/audio_strawberry.mp3'),
(10, 'Peach', 'Đào', '(Noun)', 'https://example.com/seed_peach.jpg', 'https://example.com/sprout_peach.jpg', 'https://example.com/flower_peach.jpg', 'https://example.com/audio_peach.mp3'),
(11, 'Cherry', 'Anh đào', '(Noun)', 'https://example.com/seed_cherry.jpg', 'https://example.com/sprout_cherry.jpg', 'https://example.com/flower_cherry.jpg', 'https://example.com/audio_cherry.mp3'),
(12, 'Pear', 'Lê', '(Noun)', 'https://example.com/seed_pear.jpg', 'https://example.com/sprout_pear.jpg', 'https://example.com/flower_pear.jpg', 'https://example.com/audio_pear.mp3'),
(13, 'Kiwi', 'Kiwi', '(Noun)', 'https://example.com/seed_kiwi.jpg', 'https://example.com/sprout_kiwi.jpg', 'https://example.com/flower_kiwi.jpg', 'https://example.com/audio_kiwi.mp3'),
(14, 'Pomegranate', 'Lựu', '(Noun)', 'https://example.com/seed_pomegranate.jpg', 'https://example.com/sprout_pomegranate.jpg', 'https://example.com/flower_pomegranate.jpg', 'https://example.com/audio_pomegranate.mp3'),
(15, 'Avocado', 'Bơ', '(Noun)', 'https://example.com/seed_avocado.jpg', 'https://example.com/sprout_avocado.jpg', 'https://example.com/flower_avocado.jpg', 'https://example.com/audio_avocado.mp3'),
(16, 'Coconut', 'Dừa', '(Noun)', 'https://example.com/seed_coconut.jpg', 'https://example.com/sprout_coconut.jpg', 'https://example.com/flower_coconut.jpg', 'https://example.com/audio_coconut.mp3'),
(17, 'Blueberry', 'Việt quất', '(Noun)', 'https://example.com/seed_blueberry.jpg', 'https://example.com/sprout_blueberry.jpg', 'https://example.com/flower_blueberry.jpg', 'https://example.com/audio_blueberry.mp3'),
(18, 'Raspberry', 'Mâm xôi', '(Noun)', 'https://example.com/seed_raspberry.jpg', 'https://example.com/sprout_raspberry.jpg', 'https://example.com/flower_raspberry.jpg', 'https://example.com/audio_raspberry.mp3'),
(19, 'Plum', 'Mận', '(Noun)', 'https://example.com/seed_plum.jpg', 'https://example.com/sprout_plum.jpg', 'https://example.com/flower_plum.jpg', 'https://example.com/audio_plum.mp3'),
(20, 'Apricot', 'Mơ', '(Noun)', 'https://example.com/seed_apricot.jpg', 'https://example.com/sprout_apricot.jpg', 'https://example.com/flower_apricot.jpg', 'https://example.com/audio_apricot.mp3'),
(21, 'Fig', 'Sung', '(Noun)', 'https://example.com/seed_fig.jpg', 'https://example.com/sprout_fig.jpg', 'https://example.com/flower_fig.jpg', 'https://example.com/audio_fig.mp3'),
(22, 'Dragonfruit', 'Thanh long', '(Noun)', 'https://example.com/seed_dragonfruit.jpg', 'https://example.com/sprout_dragonfruit.jpg', 'https://example.com/flower_dragonfruit.jpg', 'https://example.com/audio_dragonfruit.mp3'),
(23, 'Lychee', 'Vải', '(Noun)', 'https://example.com/seed_lychee.jpg', 'https://example.com/sprout_lychee.jpg', 'https://example.com/flower_lychee.jpg', 'https://example.com/audio_lychee.mp3'),
(24, 'Papaya', 'Đu đủ', '(Noun)', 'https://example.com/seed_papaya.jpg', 'https://example.com/sprout_papaya.jpg', 'https://example.com/flower_papaya.jpg', 'https://example.com/audio_papaya.mp3'),
(25, 'Guava', 'Ổi', '(Noun)', 'https://example.com/seed_guava.jpg', 'https://example.com/sprout_guava.jpg', 'https://example.com/flower_guava.jpg', 'https://example.com/audio_guava.mp3');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `creatorId` (`creatorId`),
  ADD KEY `courseTypeId` (`courseTypeId`);

--
-- Indexes for table `course_types`
--
ALTER TABLE `course_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `frames`
--
ALTER TABLE `frames`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `frame_vocabulary`
--
ALTER TABLE `frame_vocabulary`
  ADD PRIMARY KEY (`id`),
  ADD KEY `frame_id` (`frame_id`),
  ADD KEY `vocab_id` (`vocab_id`);

--
-- Indexes for table `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `vocabulary`
--
ALTER TABLE `vocabulary`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `frames`
--
ALTER TABLE `frames`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `frame_vocabulary`
--
ALTER TABLE `frame_vocabulary`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=212;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `vocabulary`
--
ALTER TABLE `vocabulary`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`creatorId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`courseTypeId`) REFERENCES `course_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `frame_vocabulary`
--
ALTER TABLE `frame_vocabulary`
  ADD CONSTRAINT `frame_vocabulary_ibfk_1` FOREIGN KEY (`frame_id`) REFERENCES `frames` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `frame_vocabulary_ibfk_2` FOREIGN KEY (`vocab_id`) REFERENCES `vocabulary` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lessons`
--
ALTER TABLE `lessons`
  ADD CONSTRAINT `lessons_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
