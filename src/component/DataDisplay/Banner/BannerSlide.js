// import React, {useState, useEffect} from 'react'
// import '../../Asset/css/_banner.css'
// import Banner1 from "../../Asset/image/Banner1.JPG"
// import Banner2 from "../../Asset/image/Banner2.JPG"

// const BannerSlice = () => {
//     const BannerItems = [
//         {id: 1, image: Banner1, alt:"Banner1"},
//         {id: 2, image: Banner2, alt:"Banner2"},
//     ];
//     const [currentIndex, setCurrentIndex] = useState(0);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentIndex((prevIndex) => {
//                 if (typeof prevIndex === 'number' && !isNaN(prevIndex)) {
//                     return (prevIndex + 1) % BannerItems.length;
//                 } else {
//                     console.error('prevIndex is invalid:', prevIndex);
//                     return 0; // Hoặc giá trị mặc định nào đó hợp lệ
//                 }
//             });
//         }, 3000);
    
//         return () => clearInterval(interval); // Dọn dẹp khi component unmount
//     }, []);  // Chạy 1 lần khi component mount

//     return (
//         <div className="banner_slider">
//             {BannerItems.map((banner, index) => (
//             <div
//                 key={banner.id}
//                 className={`slide ${index === currentIndex ? "active" : ""}`}>
//                 <img src={banner.image} alt={banner.alt} />
//             </div>
//             ))}
//     </div>
//     );
// }

// export {BannerSlice}; 

import React, { useState, useEffect } from 'react'
import '../../Asset/css/_banner.css'
import Banner1 from "../../Asset/image/Banner1.JPG"
import Banner2 from "../../Asset/image/Banner2.JPG"
import { FaCircleChevronLeft,FaCircleChevronRight } from "react-icons/fa6";

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

export {BannerSlice};
