import LayoutClient from '../Layout/Main'
import Home from '../Page_Client/Home'
// import Introduce from '../Pages/Introduce'
import LayoutAdmin from '../Layout/Admin.layout'
import Login from '../Pages_admin/Login/Login'
import Dashboard from '../Pages_admin/Dashboard'
import Addproduct from '../Pages_admin/Product/AddProduct'
import ListProduct from '../Pages_admin/Product/ListProduct'
import BrandList from '../Pages_admin/Brand/ListBrand'
import CategoryList from "../Pages_admin/Category/ListCategory"
import AddBrand from "../Pages_admin/Brand/AddBrand"

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
            { path: "add-product", component: Addproduct},
            { path: "add-product/:id", component: Addproduct},
            { path: "add-brand", component: AddBrand},
            { path: "list-product", component: ListProduct},
            { path: "list-brand", component: BrandList},
            { path: "list-category", component: CategoryList},
        ],
    },
];
export { routes };