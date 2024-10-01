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

const router = createBrowserRouter([
  {
    element: (
      <div>
        <Header />
        <LogoutLink />
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
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;