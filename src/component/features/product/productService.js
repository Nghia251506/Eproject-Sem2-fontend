import axios from "axios";

const API_URL = "http://192.168.55.108:3389"; // Thay đổi URL nếu backend của bạn dùng địa chỉ khác

// Lấy danh sách sản phẩm
const getProducts = async () => {
  const response = await axios.get(`${API_URL}/admin/list-product`);
  // console.log(response);
  return response.data; // Trả về dữ liệu JSON từ backend
};

// Tạo mới sản phẩm
const createProduct = async (productData) => {
  const response = await axios.post(`${API_URL}/add-product`, productData);
  return response.data; // Trả về sản phẩm vừa tạo
};

// Lấy thông tin chi tiết của một sản phẩm
const getProduct = async (id) => {
  const response = await axios.get(`${API_URL}/admin/detail/${id}`);
  return response.data; // Trả về chi tiết sản phẩm
};

// Xóa sản phẩm theo ID
const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/admin/delete/${id}`);
  return response.data; // Trả về thông báo hoặc kết quả xóa
};
// Lấy sản phẩm theo category_id
const getProductByCategory = async (category_id) => {
  const response = await axios.getProductByCategory(`${API_URL}/getProductByCategory/${category_id}`);
  return response.data;
};

// Cập nhật sản phẩm
const updateProduct = async (productData) => {
  const response = await axios.put(`${API_URL}/admin/update/${productData.id}`, productData);
  return response.data; // Trả về sản phẩm đã cập nhật
};

// Export tất cả các phương thức
const productService = {
  getProducts,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  getProductByCategory,
};

export default productService;
