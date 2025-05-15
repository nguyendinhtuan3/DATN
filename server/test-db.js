const mysql = require('mysql2');

// Tạo kết nối cơ bản
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456', // Đổi nếu bạn đặt mật khẩu khác
  database: 'toeic_db',
});

// Kết nối đến CSDL
db.connect((err) => {
  if (err) {
    console.error('❌ Lỗi kết nối CSDL:', err);
    return;
  }

  console.log('✅ Kết nối CSDL thành công!');

  // Truy vấn dữ liệu
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('❌ Lỗi truy vấn:', err);
    } else {
      console.log('📄 Dữ liệu từ bảng users:', results);
    }

    db.end(); // Đóng kết nối sau khi truy vấn xong
  });
});
