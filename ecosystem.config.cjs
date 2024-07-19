module.exports = {
  apps: [
    {
      name: "dev-admin", // Đặt tên ứng dụng của bạn (tùy chọn)
      script: "npm", // Hoặc "yarn" nếu bạn sử dụng Yarn
      args: "run start", // Lệnh để chạy Next.js trong production
      instances: 1, // Số lượng instances (thường là 1 cho Next.js)
      autorestart: true, // Tự động khởi động lại khi lỗi
      watch: false, // Không cần theo dõi file (Next.js tự xử lý)
      max_memory_restart: "1G", // Khởi động lại khi dùng quá 1GB RAM (tùy chỉnh)
      env: {
        NODE_ENV: "production", // Môi trường production
        PORT: 4002, // Cổng mặc định (hoặc thay đổi theo ý muốn)
      },
    },
  ],
};
