import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import _container from '../Asset/css/_container.module.css';
import _home from '../Asset/css/_home.module.css';
import { Link } from 'react-router-dom';
import {BannerSlice, BannerBrand} from '../DataDisplay/Banner/BannerSlide' 
import Banner1 from '../Asset/image/Banner2.JPG'
import HomeProduct from './Product/HomeProduct'
// import Qr from '';
function Home (){
    return(
        <>
            <div className={_container.container}>
                 <div className={_home.homeBanner}>
                    <div className={_home.homeBanner_1}>
                        <BannerSlice/>
                    </div>
                    <div>
                        <div className={_home.cardvisit}>
                            <img src={Banner1} alt="Banner"/>
                        </div>
                        <div>Ở đây vẫn chưa biết để cái gì</div>
                    </div>
                 </div>
                 <div className={_home.brandbanner}>
                    <BannerBrand/>
                    <div>
                        <HomeProduct/>
                    </div>
                 </div>
            </div>
        </>
    );
}

export default Home;