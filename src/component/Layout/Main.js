import Footer from "./Footer";
import Header from "./Header";
// import _container from '../Asset/css/_container.module.css'
import { Outlet } from "react-router-dom";

function Main({children}){
    return(
        <>
        <Header/>
        {children || <Outlet />}
        <Footer/>
    </>
    );
}

export default Main;