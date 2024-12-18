import Footer from "./Footer";
import Header from "./Header";
import _container from '../Asset/css/_container.module.css'

function Main(){
    return(
        <div>
            <div>
                <Header/>
            </div>
        <div className={_container.container}>
                <Footer/>
        </div>
        </div>
    );
}

export default Main;