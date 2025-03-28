import _home from '../../Asset/css/_home.module.css';
import _header from '../../Asset/css/_header.module.css';
import _footer from '../../Asset/css/_footer.module.css';
import _container from '../../Asset/css/_container.module.css'
import React, { useState, useContext } from 'react';
import { CartContext } from "./CartContext";

const CartProduct = () => {
    
    // const [cart, setCart] = useState([
    //     { id: 1, name: 'Sản phẩm 1',quanity: 1, price: 100, src: 'https://hanoicomputercdn.com/media/product/87738_84781_vo_case_xigmatek_fly_ii_3gf_en44663_atx_mid_tower_mau_den_3_fan_vo_cuc__2_.jpg' },
    //     { id: 2, name: 'Sản phẩm 2',quanity: 2, price: 200, src:'https://hanoicomputercdn.com/media/product/87738_84781_vo_case_xigmatek_fly_ii_3gf_en44663_atx_mid_tower_mau_den_3_fan_vo_cuc__2_.jpg' },
    //     { id: 3, name: 'Sản phẩm 3',quanity: 3, price: 300, src:'https://hanoicomputercdn.com/media/product/87738_84781_vo_case_xigmatek_fly_ii_3gf_en44663_atx_mid_tower_mau_den_3_fan_vo_cuc__2_.jpg' },
    //   ]);
    
    const { cartState } = useContext(CartContext);
    console.log('cart: ' + JSON.stringify(cartState))
    const removeFromCart = (id) => {
        // setCart(cart.filter(item => item.id !== id)); // Xóa sản phẩm có id tương ứng
    };

    return (
        <div className={_home.product_container}>
            <div className={_container.container}>
                <h3 >Danh sách sản phẩm</h3>
            </div>
            {cartState.products.length === 0 ? (
                <div><p>Giỏ hàng trống</p></div>
            ) : (
                <div style={{ width: '100%', height: '100%', marginBottom: '20px'}}>
                <div className={_container.container}>
                    {cartState.products.map((item) => (
                        <div className={_footer.footer_container} style={{ marginBottom: '20px', border: '1px solid #090635', borderRadius: '15px'}}>
                            <div className={_header.logo_container}>
                                <img className={_header.logo} src={item.src} alt=''/>
                            </div>
                                <div>
                                    <b>{item.name}</b>
                                </div>
                                <div>
                                    <b>{item.quanity}</b>
                                </div>
                            <div className="d-flex align-items-center gap-1" style={{marginRight: '10px'}}>
                                <b>{item.price * item.quanity} Vnđ</b>
                            </div>
                            <div>
                                <button onClick={() => removeFromCart(item.id)}>Xóa</button>
                            </div>
                        </div>
                    ))}
                    <div>
                        <h4>Tổng tiền: {cartState.products.reduce((total, item) => total + (item.price * item.quanity), 0)} VNĐ</h4>
                    </div>
                    <div>
                        <a href='/payment' className={_footer.footer_payment_button}>Thanh toán</a>
                    </div>
                </div>
            </div>
            )}
            
        </div>
    );
};

export default CartProduct;