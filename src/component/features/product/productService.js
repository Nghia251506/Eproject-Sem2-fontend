import axios from "axios";

const API_URL = "http://tncom.ddns.net:3389"; // Thay đổi URL nếu backend của bạn dùng địa chỉ khác

// Lấy danh sách sản phẩm
const getProducts = async () => {
  const response = await axios.get(`${API_URL}/admin/list-product`);
  // console.log(response);
  return response.data; // Trả về dữ liệu JSON từ backend
};

const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}/list-product`);
  return response.data; // Trả về dữ liệu JSON từ backend
}
const CreateProductDetail = async (detailData) => {
  const response = await axios.post(`${API_URL}/admin/add-detail`,detailData,
    {
    headers: {
      'Content-Type': 'application/json',  // Đảm bảo gửi dữ liệu dư��i dạng JSON
    },
  });
  return response.data.detailData;
};

const getDetail = async (productID) => {
  const response = await axios.get(`${API_URL}/admin/detailbyproductid`,productID);
  return response.data;
};
// Tạo mới sản phẩm
const createProduct = async (productData) => {
  const response = await axios.post(
    `${API_URL}/admin/add-product`, 
    productData,
    {
      headers: {
        'Content-Type': 'application/json',  // Đảm bảo gửi dữ liệu dưới dạng JSON
      },
    }
  );
  console.log(response.data);
  return response.data.productData; // Trả về sản phẩm vừa tạo
};


// Lấy thông tin chi tiết của một sản phẩm
const getProduct = async (id) => {
  const response = await axios.get(`${API_URL}/api/detail/${id}`);
  // console.log(response.data);
  return response.data; // Trả về chi tiết sản phẩm
};

// Xóa sản phẩm theo ID
const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/admin/delete`,{
    data:{id},
  });
  return response.data; // Trả về thông báo hoặc kết quả xóa
};
// Lấy sản phẩm theo category_id
const getProductByCategory = async (category_id) => {
  const response = await axios.get(`${API_URL}/getProductByCategory/${category_id}`);
  return response.data;
};

const getProductByCode = async (code) => {
  const response = await axios.post(`${API_URL}/getProductByCode`, [code],
    {
      headers: {
        'Content-Type': 'application/json',  // Đảm bảo gửi dữ liệu dưới dạng JSON
      },
});
  return response;
}

const ProductDetail = async(id,name) =>{
  const response = await axios.get(`${API_URL}/:${name}/:${id}`);
  return response.data;
}

// Cập nhật sản phẩm
const updateProduct = async (id,productData) => {
  const response = await axios.put(`${API_URL}/admin/add-product/${id}`,
    productData,
    {
      headers: {
        'Content-Type': 'application/json',  // Đảm bảo gửi dữ liệu dưới dạng JSON
      },
    });
  return response.data.productData; // Trả về sản phẩm đã cập nhật
};

// Export tất cả các phương thức
const productService = {
  getProducts,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  getProductByCategory,
  getProductByCode,
  ProductDetail,
  fetchProducts,
  CreateProductDetail,
  getDetail
};

export default productService;
