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
import ForgotPassword from "../Pages_admin/Login/ForgotPassWord"
import ListOrder from '../Pages_admin/Order/ListOrder'
import AddBill from '../Pages_admin/Bill/AddBill'
import ListBill from '../Pages_admin/Bill/ListBill'
import ListCustomer from '../Pages_admin/Customer/ListCustomer'
import ProductDetail from '../Page_Client/Product/ProductDetail'

const routes = [
    { path: "/login", component: Login},
    { path: "/forgotpassword", component: ForgotPassword},
    { 
        path: "", 
        layout: LayoutClient,
        children: [
            {path:"/", component: Home},
            {path:"/:name/:id", component: ProductDetail},
        ],
    },
    {
        path: "/admin",
        layout: LayoutAdmin,
        children: [
            { path:"",component: Dashboard},
            { path: "add-product", component: Addproduct},
            { path: "add-product/:id", component: Addproduct},
            { path: "add-brand", component: AddBrand},
            { path: "add-bill", component: AddBill},
            { path: "list-product", component: ListProduct},
            { path: "list-brand", component: BrandList},
            { path: "list-category", component: CategoryList},
            { path: "order", component: ListOrder},
            { path: "list-bill", component: ListBill},
            { path: "customers", component: ListCustomer},
        ],
    },
];
export { routes };