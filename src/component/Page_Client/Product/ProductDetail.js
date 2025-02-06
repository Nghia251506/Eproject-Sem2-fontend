import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _detail from '../../Asset/css/_detail.module.css';
import _container from '../../Asset/css/_container.module.css';
import { Link, useLocation } from 'react-router-dom';
import { resetState, ClientProductDetail } from '../../features/product/productSlice';

const ProductDetail = () => {
    const dispatch = useDispatch();
    const productState = useSelector((state) => state.product) || {};
    const location = useLocation();
    const getProductId = location.pathname.split("/")[3];
    console.log("Product:",productState);
    useEffect(() => {
        dispatch(resetState());
        dispatch(ClientProductDetail(getProductId));
    }, [dispatch, getProductId]);

    // Kiểm tra nếu chưa có dữ liệu sản phẩm
    if (!productState) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`${_detail.detail_container}`}>
            <div className={`${_container.container}`}>
                {/* Breadcrumb */}
                <div className={_detail.breadcrumb}>
                    <Link to="/">Trang chủ</Link> / <Link to="/category">Danh mục</Link> / {productState.name}
                </div>

                <div className={_detail.detail_content}>
                    {/* Hình ảnh sản phẩm */}
                    <div className={_detail.image_section}>
                        <img 
                            src={productState.image_url || "https://maytinhlaptophn.vn/img/error/no-image-large.png"} 
                            alt={productState.name} 
                            className={_detail.product_image} 
                        />
                    </div>

                    {/* Thông tin sản phẩm */}
                    <div className={_detail.info_section}>
                        <h1 className={_detail.product_name}>{productState.name}</h1>
                        <p className={_detail.product_price}>
                            {productState.price?.toLocaleString()}đ
                        </p>
                        
                        {/* Số lượng */}
                        <div className={_detail.quantity_section}>
                            <span>Số lượng</span>
                            <div className={_detail.quantity_control}>
                                <button className={_detail.quantity_btn}>-</button>
                                <input 
                                    type="number" 
                                    className={_detail.quantity_input} 
                                    min="1" 
                                    defaultValue="1" 
                                />
                                <button className={_detail.quantity_btn}>+</button>
                            </div>
                        </div>

                        {/* Nút Thêm vào Giỏ và Mua Ngay */}
                        <div className={_detail.action_buttons}>
                            <button className={_detail.add_to_cart_btn}>Thêm giỏ hàng</button>
                            <button className={_detail.buy_now_btn}>Mua ngay</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
