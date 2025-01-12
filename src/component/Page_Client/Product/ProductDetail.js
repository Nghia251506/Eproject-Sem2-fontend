import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _home from '../../Asset/css/_home.module.css';
import {Link} from 'react-router-dom'

const ProductDetail = () =>{
    const dispatch = useDispatch();
    const productState = useSelector((state) => state.product.product) || {};
    return(
        <div>
            Đây là trang detail
        </div> 
    );
}

export default ProductDetail;