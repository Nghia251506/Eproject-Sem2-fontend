import React, { useEffect } from 'react';
import { ClientListCategories, resetStateCategory } from '../../features/Category/categorySlice';
import { getProducts, resetState } from "../../features/product/productSlice";
import { useDispatch, useSelector } from 'react-redux';

const HomeProduct = () => {
    const dispatch = useDispatch();
    const productState = useSelector((state) => state.product.products) || [];
    const categoryState = useSelector((state) => state.category.categories) || [];

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

    // Function to truncate text
    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    return (
        <div>
            {categoryState.map((category) => (
                <div key={category._id} style={{ marginBottom: "2rem" }}>
                    <h2 style={{ color: "orange" }}>{category.category_name}</h2>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                        {productState
                            .filter((product) => product.category_name === category.category_name)
                            .map((product) => (
                                <div
                                    key={product.id}
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "1rem",
                                        borderRadius: "8px",
                                        width: "calc(25% - 1rem)",
                                    }}
                                >
                                    <img
                                        src={product.image_url}
                                        alt={product.name}
                                        style={{ width: "100%", height: "auto", marginBottom: "1rem" }}
                                    />
                                    <h3>{truncateText(product.name, 20)}</h3> {/* Giới hạn 20 ký tự cho tên */}
                                    <p style={{ color: "red", fontWeight: "bold" }}>
                                        {product.price.toLocaleString("vi-VN")}₫
                                    </p>
                                    <button
                                        style={{
                                            backgroundColor: "#f5f5f5",
                                            border: "1px solid #ccc",
                                            padding: "0.5rem 1rem",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>
                            ))}
                            {productState.filter((product) => product.category_name === category.category_name).length === 0 && (
                                <p>Không có sản phẩm nào trong danh mục này.</p>
                            )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HomeProduct;
