import axios from 'axios';

const API_URL = "http://tncom.ddns.net:3389";

// Lấy danh sách đơn hàng
const getBills = async () => {
  const response = await axios.get(`${API_URL}/admin/list-bill`);
  return response.data;
};

// Lấy thông tin đơn hàng theo ID
const getBillById = async (bill_id) => {
  const response = await axios.get(`${API_URL}/admin/detail-bill/${bill_id}`);
  return response.data;
};

// Tạo mới đơn hàng
const createBill = async (billData) => {
  const response = await axios.post(`${API_URL}/admin/add-bill`, billData);
  return response.data.billData;
};

// Cập nhật đơn hàng
const updateBill = async (billData) => {
  const response = await axios.put(`${API_URL}/admin/update-bill/${billData.id}`, billData);
  return response.data.billData;
};

const billService ={
    getBills,
    getBillById,
    createBill,
    updateBill,
}
export default billService;