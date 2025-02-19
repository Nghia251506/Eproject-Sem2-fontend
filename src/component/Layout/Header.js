import _header from '../Asset/css/_header.module.css'
import _container from '../Asset/css/_container.module.css'
import logo from '../Asset/image/logo_tnc.png'
import {INPUT} from '../DataEntry/Input/input';
import { LuShoppingBasket } from "react-icons/lu";
import clsx from 'clsx';

function Header(){
    return(
        <div>
            <div className={_header.header}>
                <div className={_container.container}>
                    <div className={_header.header_container}>
                        <div className={_header.logo_container}>
                            <img className={_header.logo} src={logo} alt=''/>
                        </div>
                            <div>
                                <INPUT/>
                            </div>
                        <div className="d-flex align-items-center gap-1">
                            <div>
                                <LuShoppingBasket style={{color: "white", fontSize:"1.25rem"}}/>
                            </div>
                            <div>
                                <span style={{color: "white"}}> Giỏ hàng</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;