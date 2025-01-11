import Footer from "./Footer";
import Header from "./Header";
// import _container from '../Asset/css/_container.module.css'
import { Outlet } from "react-router-dom";
import "../Asset/css/_grid.css"

function Main({children}){
    return(
        <div className="grid">
        <Header/>
        {children || <Outlet />}
        <Footer/>
    </div>
    );
}

export default Main;