import axios from "axios";

const API_URL = "http://localhost:4000/api"; // Thay đổi URL nếu backend của bạn dùng địa chỉ khác

// Lấy danh sách sản phẩm
const getCategories = async () => {
  const response = await axios.get(`${API_URL}/list-category`);
  return response.data; // Trả về dữ liệu JSON từ backend
};

// Tạo mới sản phẩm
const createCategory = async (categoryData) => {
  const response = await axios.post(`${API_URL}/add-category`, categoryData);
  return response.data; // Trả về sản phẩm vừa tạo
};

// Lấy thông tin chi tiết của một sản phẩm
const getCategoryById = async (id) => {
  const response = await axios.get(`${API_URL}/detail/${id}`);
  return response.data; // Trả về chi tiết sản phẩm
};

// Xóa sản phẩm theo ID
const deleteCategory = async (id) => {
  const response = await axios.delete(`${API_URL}/delete/${id}`);
  return response.data; // Trả về thông báo hoặc kết quả xóa
};

// Cập nhật sản phẩm
const updateCategory = async (categoryData) => {
  const response = await axios.put(`${API_URL}/update/${categoryData.id}`, categoryData);
  return response.data; // Trả về sản phẩm đã cập nhật
};

// Export tất cả các phương thức
const categoryService = {
  getCategories,
  createCategory,
  getCategoryById,
  deleteCategory,
  updateCategory,
};

export default categoryService;
