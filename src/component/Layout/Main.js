import Footer from "./Footer";
import Header from "./Header";
// import _container from '../Asset/css/_container.module.css'
import { Outlet } from "react-router-dom";
import "../Asset/css/_grid.css"
import LayoutNavigate from '../Navigation/LayoutNavagate';
import _container from '../Asset/css/_container.module.css'
import _header from '../Asset/css/_header.module.css'
function Main({children}){
    return(
        <div className="grid">
        <div className={_header.header_layout}>
            <Header/>
            <div className={_header.layout_navigate}>
                <LayoutNavigate/>
            </div>
        </div>
        {children || <Outlet />}
        <Footer/>
    </div>
    );
}

export default Main;