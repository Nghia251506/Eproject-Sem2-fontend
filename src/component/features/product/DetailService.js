import axios from 'axios'

const API_URL = "http://tncom.ddns.net:3389";

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

  const DetailService = {
    CreateProductDetail,
    getDetail
  }

  export default DetailService;