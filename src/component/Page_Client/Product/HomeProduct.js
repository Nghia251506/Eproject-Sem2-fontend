import React, { useEffect, useState } from 'react';
import { ClientListCategories, resetStateCategory } from '../../features/Category/categorySlice';
import { getProducts, resetState } from "../../features/product/productSlice";
import { useDispatch, useSelector } from 'react-redux';
import _home from '../../Asset/css/_home.module.css';
import { GoChevronRight } from "react-icons/go";
import { LuShoppingBasket } from "react-icons/lu";
import {Link} from 'react-router-dom'

const HomeProduct = () => {
    const dispatch = useDispatch();
    const productState = useSelector((state) => state.product.products) || [];
    const categoryState = useSelector((state) => state.category.categories) || [];

    // Trạng thái hiển thị số lượng sản phẩm cho từng danh mục
    const [visibleProducts, setVisibleProducts] = useState({});

    // Fetch categories
    useEffect(() => {
        dispatch(resetStateCategory());
        dispatch(ClientListCategories());
    }, [dispatch]);

    // Fetch products
    useEffect(() => {
        dispatch(resetState());
        dispatch(getProducts());
    }, [dispatch]);

    // Debugging fetched data
    useEffect(() => {
        console.log("Categories fetched:", categoryState);
        console.log("Products fetched:", productState);
    }, [categoryState, productState]);

    // Khi categories thay đổi, khởi tạo trạng thái hiển thị ban đầu (10 sản phẩm mỗi danh mục)
    useEffect(() => {
        const initialVisibleProducts = {};
        categoryState.forEach((category) => {
            initialVisibleProducts[category.category_name] = 8; // Mặc định hiển thị 10 sản phẩm
        });
        setVisibleProducts(initialVisibleProducts);
    }, [categoryState]);

    // Function to truncate text
    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    // Xử lý nút "Xem thêm"
    const handleShowMore = (categoryName) => {
        const totalProducts = productState.filter((product) => product.category_name === categoryName).length;
        setVisibleProducts((prevState) => ({
            ...prevState,
            [categoryName]: totalProducts, // Hiển thị toàn bộ sản phẩm còn lại
        }));
    };

    return (
        <div>
            {categoryState.map((category) => {
                // Lọc sản phẩm theo danh mục
                const filteredProducts = productState.filter(
                    (product) => product.category_name === category.category_name
                );
                // Sản phẩm hiển thị (giới hạn theo trạng thái visibleProducts)
                const productsToShow = filteredProducts.slice(0, visibleProducts[category.category_name] || 10);
                // Số lượng sản phẩm còn lại
                const remainingProducts = filteredProducts.length - productsToShow.length;

                return (
                    <div key={category._id} style={{ marginBottom: "2rem" }}>
                        <div className={_home.label}>
                            <span className={_home.label_product}>{category.category_name}</span>
                        </div>
                        <div className={_home.product_container}>
                            {productsToShow.map((product) => (
                                <div key={product.id} className={_home.product_items}>
                                    <img
                                        src={product.image_url ? product.image_url : "https://png.pngtree.com/png-clipart/20191120/original/pngtree-error-file-icon-vectors-png-image_5053766.jpg"}
                                        alt=""
                                        className={_home.product_items_img}
                                    />
                                    <Link to={`/${product.name}/${product.id}`}><span>{truncateText(product.name, 40)}</span></Link>
                                    <p className={_home.product_items_price}>
                                        {product.price.toLocaleString("vi-VN")}₫
                                    </p>
                                    <button
                                    className={_home.home_button_add_to_card}
                                    >
                                    <LuShoppingBasket className="fs-5" />  &nbsp;
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>
                            ))}
                        </div>
                        {/* Hiển thị nút "Xem thêm" nếu còn sản phẩm */}
                        {remainingProducts > 0 && (
                            <button
                                onClick={() => handleShowMore(category.category_name)}
                                className={_home.button_seemore}
                            >
                                Xem thêm ({remainingProducts}) sản phẩm <GoChevronRight/>
                            </button>
                        )}
                        {/* Hiển thị thông báo nếu không có sản phẩm */}
                        {filteredProducts.length === 0 && <p>Không có sản phẩm nào trong danh mục này.</p>}
                    </div>
                );
            })}
        </div>
    );
};

export default HomeProduct;
