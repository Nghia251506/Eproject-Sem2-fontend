import { useState } from 'react';

import _container from '../../Asset/css/_container.module.css'
import _payment from '../../Asset/css/_payment.module.css'
import _home from '../../Asset/css/_home.module.css';
import _footer from '../../Asset/css/_footer.module.css';
import { Input } from 'antd';


function Payment() {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
    });

    const [isChecked, setIsChecked] = useState(false);
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form Submitted:", formData);
      // Perform further actions like API calls
    };
  
    return (
        <div className={_home.product_container}>
            <div className={_container.container}>
                <h3 >Thông tin</h3>
            </div>
            
            <div style={{ width: '100%', height: '100%', marginBottom: '20px'}}>
                <div className={_container.container}>
                    <div className={_payment.payment_container} style={{width: '100% !important'}}>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Tên của bạn:</label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Điện thoại:</label>
                                <Input
                                    type="phone"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Địa chỉ:</label>
                                <Input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <br />
                            <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                            className="w-4 h-4"
                            />
                            <span>Tôi đồng ý với điều khoản</span>
                            <br />
                            <button  onClick={handleSubmit}
                                disabled={!isChecked}
                                className={`px-4 py-2 rounded-lg text-white ${
                                isChecked ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
                                }`} type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default Payment;