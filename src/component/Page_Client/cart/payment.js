import { useState } from 'react';

import _container from '../../Asset/css/_container.module.css'
import _payment from '../../Asset/css/_payment.module.css'
import _home from '../../Asset/css/_home.module.css';
import _footer from '../../Asset/css/_footer.module.css';


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
                <h3 >Danh sách sản phẩm</h3>
            </div>
            
            <div style={{ width: '100%', height: '100%', marginBottom: '20px'}}>
                <div className={_container.container}>
                    <div className={_footer.footer_container} style={{width: '100%'}}>
                        <form onSubmit={handleSubmit}>
                            <label>
                            Name: 
                            </label>
                            <input className={_payment.input} type="text" name="name" value={formData.name} onChange={handleChange} />
                            <br />
                            <label>
                            Email: 
                            </label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} />
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