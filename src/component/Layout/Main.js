import Footer from "./Footer";
import Header from "./Header";
// import _container from '../Asset/css/_container.module.css'
import { Outlet } from "react-router-dom";
import _grid from "../Asset/css/Grid.module.css"

function Main({children}){
    return(
        <div className={_grid.grid}>
        <Header/>
        {children || <Outlet />}
        <Footer/>
    </div>
    );
}

export default Main;