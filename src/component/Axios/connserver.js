import axios from 'axios';

// Tạo một instance của axios với cấu hình mặc định
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // URL của backend (server Node.js)
  timeout: 5000, // Thời gian chờ mặc định
  headers: {
    'Content-Type': 'application/json', // Định dạng dữ liệu gửi đi
  },
});

// Nếu cần thêm cấu hình như token hoặc bất kỳ header nào khác
api.interceptors.request.use(
  (config) => {
    // Ví dụ: Thêm token vào header nếu người dùng đã đăng nhập
    const token = localStorage.getItem('token'); // Hoặc từ session, Redux, etc.
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
