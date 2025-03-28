// import { BrownserRouter as Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from './component/Router/routes';
import {Outlet} from 'react-router-dom'
import React from 'react';
import { CartProvider } from "./component/Page_Client/cart/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
      <Routes>
        {routes.map((item, index) => {
          const Page = item.component;
          const Layout = item.layout || React.Fragment; // Dùng Fragment nếu không có layout

          return (
            <Route
              key={index}
              path={item.path}
              element={
                <Layout>
                  {item.layout ? <Outlet /> : <Page />} 
                </Layout>
              }
            >
              {/* Route con (nếu có) */}
              {item.children &&
                item.children.map((child, childIndex) => {
                  const ChildPage = child.component;
                  return (
                    <Route
                      key={childIndex}
                      path={child.path}
                      element={<ChildPage />}
                    />
                  );
                })}
            </Route>
          );
        })}
      </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
