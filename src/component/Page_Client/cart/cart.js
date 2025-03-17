import _home from '../../Asset/css/_home.module.css';
import _header from '../../Asset/css/_header.module.css';
import _footer from '../../Asset/css/_footer.module.css';
import _container from '../../Asset/css/_container.module.css'

const CartProduct = () => {
    return (
        <div className={_home.product_container}>
            <div className={_container.container}>
                <h3 >Danh sách sản phẩm</h3>
            </div>
            
            <div style={{ width: '100%', height: '100%', marginBottom: '20px'}}>
                <div className={_container.container}>
                    <div className={_footer.footer_container} style={{ marginBottom: '20px', border: '1px solid #090635', borderRadius: '15px'}}>
                        <div className={_header.logo_container}>
                            <img className={_header.logo} src='https://hanoicomputercdn.com/media/product/87738_84781_vo_case_xigmatek_fly_ii_3gf_en44663_atx_mid_tower_mau_den_3_fan_vo_cuc__2_.jpg' alt=''/>
                        </div>
                            <div>
                                <b>Tên sản phẩm</b>
                            </div>
                        <div className="d-flex align-items-center gap-1" style={{marginRight: '10px'}}>
                            <b>100.000.000 đ</b>
                        </div>
                    </div>
                    <div>
                        <h4>Tổng tiền: 100.000.000 đ</h4>
                    </div>
                    <div>
                        <a href='/payment' className={_footer.footer_payment_button}>Thanh toán</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartProduct;