import LayoutClient from '../Layout/Main'
import Home from '../Pages/Home'
// import Introduce from '../Pages/Introduce'
import LayoutAdmin from '../Layout/Admin.layout'
import Login from '../Pages/Login/Login'
import Dashboard from '../Pages/Dashboard'
import AddProduct from '../Pages/Product/AddProduct'
import ListProduct from '../Pages/Product/ListProduct'
import ListBrand from '../Pages/Brand/ListBrand'

const routes = [
    { path: "/login", layout: Login },
    { 
        path: "/", 
        layout: LayoutClient,
        children: [
            {path:"", component: Home}
        ],
    },
    {
        path: "/admin",
        layout: LayoutAdmin,
        children: [
            {path:"",component: Dashboard},
            { path: "add-product", component: AddProduct},
            { path: "list-product", component: ListProduct},
            { path: "list-brand", component: ListBrand},
        ],
    },
];
export { routes };