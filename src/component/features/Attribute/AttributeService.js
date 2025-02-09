import axios from 'axios'

const API_URL = 'http://tncom.ddns.net:3389';

// lấy danh sách thuộc tính
const getAttributes = async () => {
  const response = await axios.get(`${API_URL}/admin/list-attribute`);
  return response.data;
};

const attributeService = {
    getAttributes,
}

export default attributeService;