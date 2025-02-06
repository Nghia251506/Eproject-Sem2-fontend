import React, { useState, useEffect } from 'react'
import '../../Asset/css/_banner.css'
import Banner1 from "../../Asset/image/Banner1.JPG"
import Banner2 from "../../Asset/image/Banner2.JPG"
import { FaCircleChevronLeft,FaCircleChevronRight } from "react-icons/fa6";
import image from '../../Asset/index'; 

const BannerSlice = () => {
    const BannerItems = [
        {id: 1, image: Banner1, alt: "Banner1"},
        {id: 2, image: Banner2, alt: "Banner2"},
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % BannerItems.length);
        }, 5000);
    
        return () => clearInterval(interval); // Dọn dẹp khi component unmount
    }, []);

    // Hàm chuyển sang ảnh trước
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + BannerItems.length) % BannerItems.length);
    };

    // Hàm chuyển sang ảnh sau
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1 + BannerItems.length) % BannerItems.length);
    };

    return (
        <div className="banner_slider">
            <div className="slider_nav prev" onClick={prevSlide}>
                <FaCircleChevronLeft/>
            </div>
            <div className="slider_nav next" onClick={nextSlide}>
                <FaCircleChevronRight/>
            </div>
            {BannerItems.map((banner, index) => (
                <div
                    key={banner.id}
                    className={`slide ${index === currentIndex ? "active" : ""}`}>
                    <img src={banner.image} alt={banner.alt} />
                </div>
            ))}
        </div>
    );
}

const BannerBrand = () => {
    const BrandItems = [
        { id: 1, image: image.HP, alt: "Logo 1" },
        { id: 2, image: image.Asus, alt: "Logo 2" },
        { id: 3, image: image.Acer, alt: "Logo 3" },
        { id: 4, image: image.Apple, alt: "Logo 4" },
        { id: 5, image: image.Dell, alt: "Logo 5" },
        { id: 6, image: image.NVDA, alt: "Logo 6" },
        { id: 7, image: image.Intel, alt: "Logo 7" },
    ];

    return (
        <div className="brand_slider">
            <div className="brand_track">
                {BrandItems.map((brand) => (
                    <div key={brand.id} className="brand_item">
                        <img src={brand.image} alt={brand.alt} />
                    </div>
                ))}
                {/* Lặp lại danh sách logo để tạo hiệu ứng cuộn */}
                {BrandItems.map((brand) => (
                    <div key={`${brand.id}-duplicate`} className="brand_item">
                        <img src={brand.image} alt={brand.alt} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export {BannerSlice, BannerBrand};
