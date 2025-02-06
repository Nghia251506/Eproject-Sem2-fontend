import axios from "axios";

const API_URL = "http://tncom.ddns.net:3389";

// List
const getBrands = async () =>{
    const response = await axios.get(`${API_URL}/admin/list-brand`);
    // console.log(response.data);
    return response.data;
};

// Create
const createBrand = async (brandData) => {
    const response = await axios.post(`${API_URL}/add-brand`, brandData);
    return response.data;
};

// Get by ID
const getBrandById = async (id) => {
    const response = await axios.get(`${API_URL}/detail/${id}`);
    return response.data;
};

// Update
const updateBrand = async (brandData) => {
    const response = await axios.put(`${API_URL}/update/${brandData.id}`, brandData);
    return response.data;
};

// Delete
const deleteBrand = async (id) => {
    const response = await axios.delete(`${API_URL}/delete/${id}`);
    return response.data;
};

const brandService ={
    getBrands,
    createBrand,
    getBrandById,
    updateBrand,
    deleteBrand
};

export default brandService;