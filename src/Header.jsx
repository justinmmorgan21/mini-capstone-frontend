import { Link } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";
export function Header() {



  let authLinks
  let welcomeUserMessage = <></>
  if (localStorage.jwt === undefined) {
    authLinks = (
      <>
      <Link to="signup">Signup</Link> | <Link to="login">Login</Link>
      </>
    )
  } else {
    authLinks = ( 
      <LogoutLink />
    )
    welcomeUserMessage = (
      <span>Welcome, USER</span>
    )
  }

  return (
    <header>
      <nav>
        <a href="#">Home</a> | <Link to="products">All Products</Link> | <Link to="products/new">New Product</Link> | <Link to="carted_products">Cart</Link> | <Link to="orders">Past Orders</Link> | {authLinks} | {welcomeUserMessage}
      </nav>
    </header>
  )
}