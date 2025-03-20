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
    const [selectedValue, setSelectedValue] = useState("option1");
  
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
                            <div className="form-group">
                                <label style={{display: 'Flex', margin: '20px 0px'}}>
                                    <Input
                                        style={{width: '10%'}}
                                        type="radio"
                                        value="option1"
                                        checked={selectedValue === "option1"}
                                        onChange={(e) => setSelectedValue(e.target.value)}
                                        required
                                    />
                                    <span style={{width: '70%'}}>Quét mã QR</span>
                                </label> 
                            </div>
                            <div className="form-group">
                                <label style={{display: 'flex'}}>
                                <Input
                                    type="radio"
                                    style={{width: '10%'}}
                                    value="option2"
                                    checked={selectedValue === "option2"}
                                    onChange={(e) => setSelectedValue(e.target.value)}
                                    required
                                />
                                    <span>Thanh toán khi nhận hàng</span>
                                </label>
                                
                            </div>
                            <br />
                           <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Input
                                type="checkbox"
                                checked={isChecked}
                                style={{width: '10%'}}
                                onChange={(e) => setIsChecked(e.target.checked)}
                                className="w-4 h-4"
                                />
                                <span>Tôi đồng ý với điều khoản</span>
                           </div>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <button  onClick={handleSubmit}
                                disabled={!isChecked}
                                style={{marginTop: '20px', borderRadius: '15px'}}
                                className={`px-4 py-2 rounded-lg text-blue ${
                                isChecked ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
                                }`} type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default Payment;