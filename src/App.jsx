import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import { Header } from "./Header";
import { ProductsPage } from "./ProductsPage";
import { Footer } from "./Footer";
import { SignupPage } from "./SignupPage";
import { LoginPage } from "./LoginPage";
import { LogoutLink } from "./LogoutLink";

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
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;