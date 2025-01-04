import React from 'react';
import {BottomLeft} from '../Navigation/Navigation'
import _container from '../Asset/css/_container.module.css';
import _home from '../Asset/css/_home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {BannerSlice} from '../DataDisplay/Banner/BannerSlide' 
import Banner from '../Asset/image/Banner1.JPG'
function Home (){
    return(
        <>
            <div className={_container.container}>
                <div className={_home.navigation}>
                    <div className={_home.home_navigation}>
                        <div>
                            <BottomLeft/>
                        </div>

                        <div className={_home.navigation_software}>
                            <h4><a href="" target='_blank'>SOFTWARES</a></h4>
                        </div>
                    </div>
                    <div className={_home.home_navigation}>
                        <div>
                            <FontAwesomeIcon icon={faStore}/>
                            <span> <a href=''>Hệ thống cửa hàng</a></span>
                        </div>
                        <div className={_home.navigation_software}>
                            <FontAwesomeIcon icon={faPhone}/>
                            <a href="tel:0862273012" targer="_blank"> 0862273012</a>
                        </div>
                    </div>
                </div>
                 <div className={_home.homeBanner}>
                    <div className={_home.homeBanner_1}>
                        <BannerSlice/>
                    </div>
                    <div className={_home.homeBanner_1}>
                        <div>
                            {/* <img src={Banner} alt="Banner"/> */}
                        </div>
                        <div>bcd</div>
                    </div>
                 </div>
            </div>
        </>
    );
}

export default Home;