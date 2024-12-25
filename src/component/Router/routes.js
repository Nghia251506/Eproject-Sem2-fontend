import LayoutClient from '../Layout/Main'
import Home from '../Pages/Home'
// import Introduce from '../Pages/Introduce'
import LayoutAdmin from '../Layout/Admin.layout'

const routes = [
    {path:"/", component: Home, layout: LayoutClient},
    // {path:"/Introduce",component: Introduce, layout: LayoutClient},
    // {path:"/Notification",component: Introduce, layout: LayoutClient},
    // {path:"/Service",component: Introduce, layout: LayoutClient},
    // {path:"/Contact",component: Introduce, layout: LayoutClient},
    {path:"/admin", layout: LayoutAdmin},
]

export {routes}