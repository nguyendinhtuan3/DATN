-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 16, 2025 lúc 05:39 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `test`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `achievements`
--

CREATE TABLE `achievements` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `points` int(11) NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `achievements`
--

INSERT INTO `achievements` (`id`, `title`, `description`, `points`, `createdAt`) VALUES
(1, 'Hoàn thành tầng 1', 'Hoàn thành tất cả bài học và mini-game ở tầng 1', 50, '2025-05-15 10:05:49'),
(2, 'Hoàn thành tầng 2', 'Hoàn thành tất cả bài học và mini-game ở tầng 2', 50, '2025-05-15 10:05:49'),
(3, 'Hoàn thành tầng 3', 'Hoàn thành tất cả bài học và mini-game ở tầng 3', 50, '2025-05-15 10:05:49'),
(4, 'Hoàn thành tầng 4', 'Hoàn thành tất cả bài học và mini-game ở tầng 4', 50, '2025-05-15 10:05:49'),
(5, 'Thu thập 5 từ vựng', 'Thêm 5 từ vựng vào Khu vườn từ vựng', 20, '2025-05-15 10:05:49'),
(6, 'Đạt 90 điểm mini-game', 'Đạt ít nhất 90 điểm trong một mini-game', 30, '2025-05-15 10:05:49');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `courses`
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
-- Đang đổ dữ liệu cho bảng `courses`
--

INSERT INTO `courses` (`id`, `title`, `description`, `creatorId`, `price`, `courseTypeId`, `link`, `image`, `createdAt`, `updatedAt`) VALUES
(3, 'TOEIC Listening Skills', 'Khóa học tập trung kỹ năng Listening', 6, 2333, '550e8400-e29b-41d4-a716-446655440002', 'https://banthucpham.id.vn/undefined/6821b7dabcae7e6eb7eeff35', 'http://res.cloudinary.com/dmcewmxyx/image/upload/v1747374459/dpshopvn/k3tpbc4xrybs7na7aifz.jpg', '2025-05-15 10:05:49', '2025-05-16 05:47:39'),
(9, 'Khóa học tập trung kỹ năng Reanding', 'Khóa học tập trung kỹ năng Reanding', 6, 2332323, '550e8400-e29b-41d4-a716-446655440000', 'https://banthucpham.id.vn/undefined/6821b7dabcae7e6eb7eeff35', 'http://res.cloudinary.com/dmcewmxyx/image/upload/v1747374468/dpshopvn/wpy5sumuxtoopw6xwxxd.jpg', '2025-05-16 05:48:05', '2025-05-16 07:47:23'),
(10, 'Khóa học Giao tiếp tiếng Anh cơ bản', 'Khóa học giúp bạn giao tiếp tiếng Anh hàng ngày dễ dàng', 12, 199000, '550e8400-e29b-41d4-a716-446655440000', 'https://example.com/khoa-hoc/giao-tiep', 'https://example.com/image.jpg', '2025-05-16 14:26:02', '2025-05-16 14:26:02');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `course_types`
--

CREATE TABLE `course_types` (
  `id` char(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `course_types`
--

INSERT INTO `course_types` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'TOEIC Beginner', '2025-05-15 10:05:49', '2025-05-15 10:05:49'),
('550e8400-e29b-41d4-a716-446655440001', 'TOEIC Advanced', '2025-05-15 10:05:49', '2025-05-15 10:05:49'),
('550e8400-e29b-41d4-a716-446655440002', 'TOEIC Skills', '2025-05-15 10:05:49', '2025-05-15 10:05:49'),
('baacee44-322b-11f0-a184-346f24116792', 'loại dốt 2', '2025-05-16 07:59:44', '2025-05-16 07:59:44');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lessons`
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
-- Đang đổ dữ liệu cho bảng `lessons`
--

INSERT INTO `lessons` (`id`, `course_id`, `title`, `content`, `createdAt`, `updatedAt`) VALUES
(2, 10, 'sđs', 'sddsd', '2025-05-16 15:39:09', '2025-05-16 22:39:09'),
(6, 3, 'Lesson 1: Listening Part 1', 'Luyện nghe Part 1 TOEIC', '2025-05-15 10:05:49', '2025-05-16 19:33:32'),
(7, 3, 'Lesson 2: Listening Part 2', 'Luyện nghe Part 2 TOEIC', '2025-05-15 10:05:49', '2025-05-16 19:33:32'),
(8, 3, 'đỉnh', 'học vào là giỏi', '2025-05-16 12:38:54', '2025-05-16 19:38:54'),
(10, 3, 'đỉnh', 'học vào là giỏi', '2025-05-16 12:39:13', '2025-05-16 19:39:13'),
(11, 3, 'đỉnh', 'học vào là giỏi', '2025-05-16 12:39:16', '2025-05-16 19:39:16'),
(77, 3, 'đỉnh', 'học vào là giỏi', '2025-05-16 12:52:48', '2025-05-16 19:52:48'),
(80, 3, 'đỉnh', 'học vào là giỏi', '2025-05-16 12:53:06', '2025-05-16 19:53:06'),
(81, 3, 'Bài học JS cập nhật', 'Nội dung mới...11', '2025-05-16 12:53:18', '2025-05-16 19:55:02'),
(723, 10, 'sdsd', 'w', '2025-05-16 15:28:41', '2025-05-16 22:28:41'),
(788, 10, 'sdsd', 'w', '2025-05-16 15:28:51', '2025-05-16 22:28:51'),
(8042, 10, 'ssss', 'sssss', '2025-05-16 15:25:43', '2025-05-16 22:25:43'),
(8043, 10, 'ưee', 'ưewe', '2025-05-16 15:30:22', '2025-05-16 22:30:22'),
(8044, 10, 'sđs', 'sdsdsd', '2025-05-16 15:31:10', '2025-05-16 22:31:10'),
(7956598, 10, 'ddsd', 'sđss', '2025-05-16 15:32:51', '2025-05-16 22:39:04'),
(7956599, 10, 'sdsd', 'sđsd', '2025-05-16 15:34:49', '2025-05-16 22:34:49');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `title`, `message`, `is_read`, `createdAt`) VALUES
(1, 4, 'Chúc mừng!', 'Bạn đã hoàn thành tầng 1 của Tòa Tháp TOEIC!', 1, '2025-05-15 10:05:51'),
(2, 4, 'Thành tựu mới!', 'Bạn đã đạt thành tựu \"Thu thập 5 từ vựng\".', 0, '2025-05-15 10:05:51'),
(5, 4, 'Nhắc nhở', 'Hãy tiếp tục học để hoàn thành tầng 3!', 0, '2025-05-15 10:05:51');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `progressreports`
--

CREATE TABLE `progressreports` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `progress` decimal(10,2) NOT NULL DEFAULT 0.00,
  `completed_lessons` int(11) NOT NULL DEFAULT 0,
  `total_lessons` int(11) NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `towerprogress`
--

CREATE TABLE `towerprogress` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `level_completed` int(11) NOT NULL DEFAULT 0,
  `total_levels` int(11) NOT NULL DEFAULT 7,
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `userachievements`
--

CREATE TABLE `userachievements` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `achievement_id` int(11) NOT NULL,
  `achieved_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `userachievements`
--

INSERT INTO `userachievements` (`id`, `user_id`, `achievement_id`, `achieved_at`) VALUES
(1, 4, 1, '2025-05-15 10:05:49'),
(2, 4, 2, '2025-05-15 10:05:49'),
(5, 4, 5, '2025-05-15 10:05:49');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
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
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `avatar`, `password`, `role`, `emailVerified`, `createdAt`, `updatedAt`) VALUES
(1, 'tuan', 'tuan@gmail.com', '/avatars/admin1.jpg', '123', 'admin', 0, '2025-05-15 10:05:49', '2025-05-15 10:07:23'),
(2, 'hien', 'hien@gmail.com', '/avatars/teacher1.jpg', '123', 'teacher', 0, '2025-05-15 10:05:49', '2025-05-15 10:07:23'),
(3, 'tung', 'tung@gmail.com', NULL, '123', 'teacher', 0, '2025-05-15 10:05:49', '2025-05-15 10:07:23'),
(4, 'quy', 'quy@gmail.com', '/avatars/student1.jpg', '123', 'student', 0, '2025-05-15 10:05:49', '2025-05-15 10:07:23'),
(6, 'datp1907@gmail.com', 'datp1907@gmail.com', NULL, '$2b$10$NvPi4doQAMGVdVdxhBPoAOdpDW8p3hV0xANW9APG3FR62R5iieiua', 'teacher', 0, '2025-05-16 05:06:03', '2025-05-16 05:06:26'),
(8, 'test@gmail.com', 'test@gmail.com', NULL, '$2b$10$N9b.jg8v9XXPWXAZthj3nuhWOAJc1K.BuF/uue5whVZBBza51S656', 'admin', 0, '2025-05-16 07:09:32', '2025-05-16 11:48:39'),
(9, 'anhtai', 'thaianhtai167@gmail.com', NULL, '$2b$10$0a7.QLHCxoncNaLLxnFZxeaYp4daX6mkUz0aCA3H8nqoF9T9fWnq.', 'admin', 0, '2025-05-16 07:12:01', '2025-05-16 08:13:07'),
(10, 'daicatai', 'tes1@gmail.com', NULL, '$2b$10$.TRHBRU4/gdmbkVglSpgL.IIc6.mHODjaGloqkX4n2gbVtbcKnSFa', 'teacher', 0, '2025-05-16 07:26:20', '2025-05-16 08:14:26'),
(11, 'daicatai', 'test10@gmail.com', NULL, '$2b$10$xDT00ILe6riv7XbuPvkrFuEauKKcRHhrA5OM7Bt7gYyyRJ4a33v3G', 'teacher', 0, '2025-05-16 07:28:21', '2025-05-16 14:09:48'),
(12, 'teacher@gmail.com', 'teacher@gmail.com', '/src/assets/image/minigame.png', '$2b$10$odVUpceeVGbiFvvhHIpHw.n9ZirmjD9VsGAJkWuzXMkYo1VnGgh.S', 'teacher', 0, '2025-05-16 14:10:59', '2025-05-16 14:11:42');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `achievements`
--
ALTER TABLE `achievements`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `creatorId` (`creatorId`),
  ADD KEY `courseTypeId` (`courseTypeId`);

--
-- Chỉ mục cho bảng `course_types`
--
ALTER TABLE `course_types`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_id` (`course_id`);

--
-- Chỉ mục cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `progressreports`
--
ALTER TABLE `progressreports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Chỉ mục cho bảng `towerprogress`
--
ALTER TABLE `towerprogress`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Chỉ mục cho bảng `userachievements`
--
ALTER TABLE `userachievements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `achievement_id` (`achievement_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `achievements`
--
ALTER TABLE `achievements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7956602;

--
-- AUTO_INCREMENT cho bảng `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `progressreports`
--
ALTER TABLE `progressreports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `towerprogress`
--
ALTER TABLE `towerprogress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `userachievements`
--
ALTER TABLE `userachievements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`creatorId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`courseTypeId`) REFERENCES `course_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `lessons`
--
ALTER TABLE `lessons`
  ADD CONSTRAINT `lessons_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `progressreports`
--
ALTER TABLE `progressreports`
  ADD CONSTRAINT `progressreports_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `progressreports_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `towerprogress`
--
ALTER TABLE `towerprogress`
  ADD CONSTRAINT `towerprogress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `towerprogress_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `userachievements`
--
ALTER TABLE `userachievements`
  ADD CONSTRAINT `userachievements_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userachievements_ibfk_2` FOREIGN KEY (`achievement_id`) REFERENCES `achievements` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
