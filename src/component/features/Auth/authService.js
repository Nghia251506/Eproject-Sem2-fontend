import axios from "axios";
const API_URL = "http://tncom.ddns.net:3389";
const login = async (user) => {
  const response = await axios.post(`${API_URL}/login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
// const getOrders = async () => {
//   const response = await axios.get(`${API_URL}user/getallorders`, config);

//   return response.data;
// };
// const getOrder = async (id) => {
//   const response = await axios.post(
//     `${base_url}user/getorderbyuser/${id}`,
//     "",
//     config
//   );

//   return response.data;
// };

const authService = {
  login,
//   getOrders,
//   getOrder,
};

export default authService;