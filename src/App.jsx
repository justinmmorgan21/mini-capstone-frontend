import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import axios from 'axios'

import { Header } from "./Header";
import { ProductsPage } from "./ProductsPage";
import { Footer } from "./Footer";
import { SignupPage } from "./SignupPage";
import { LoginPage } from "./LoginPage";
import { LogoutLink } from "./LogoutLink";
import { ProductsIndexPage } from "./ProductsIndexPage";
import { ProductsNewPage } from "./ProductsNewPage";
import { CartedProductsIndexPage } from "./CartedProductsIndexPage";
import { OrderPaymentPage } from "./OrderPaymentPage";
import { OrdersIndexPage } from "./OrdersIndexPage";
import { SavedProductsIndexPage } from "./SavedProductsIndexPage";

const router = createBrowserRouter([
  {
    element: (
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    ),
    children: [
      {
        path: "/",
        element: <ProductsPage />
      },
      {
        path: "/signup",
        element: <SignupPage />
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/products/new",
        element: <ProductsNewPage />
      },
      {
        path: "/products",
        element: <ProductsIndexPage />,
        loader: () => axios.get("http://localhost:3000/products.json").then(response => response.data)
      },
      {
        path: "/carted",
        element: <CartedProductsIndexPage />,
        loader: () => axios.get("http://localhost:3000/carted_products.json").then(response => response.data)
      },
      {
        path: "/orders/:id",
        element: <OrderPaymentPage />,
        loader: ({params}) => axios.get(`http://localhost:3000/orders/${params.id}.json`).then(response => response.data)
      },
      {
        path: "/orders",
        element: <OrdersIndexPage />,
        loader: () => axios.get("http://localhost:3000/orders.json").then(response => response.data)
      },
      {
        path: "/saved",
        element: <SavedProductsIndexPage />,
        loader: () => axios.get("http://localhost:3000/saved_products.json").then(response => response.data)
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;