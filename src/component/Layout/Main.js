import Footer from "./Footer";
import Header from "./Header";
import _container from '../Asset/css/_container.module.css'

function Main({children}){
    return(
        <>
        <Header/>
        {children}
        <Footer/>
    </>
    );
}

export default Main;