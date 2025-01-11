import axios from 'axios';

const API_URL = "http://tncom.ddns.net:3389";

// Lấy danh sách khách hàng
const getCustomers = async () => {
  const response = await axios.get(`${API_URL}/admin/customers`);
  return response.data;
};

// Thêm mới khách hàng
const createCustomer = async (customerData) => {
  const response = await axios.post(`${API_URL}/admin/add-customer`, customerData,
    {
      headers: {
        'Content-Type': 'application/json',  // Đảm bảo gửi dữ liệu dư��i dạng JSON
      },
    }
  );
  return response.data.customerData;
};

const customerService = {
    getCustomers,
    createCustomer,
}

export default customerService;