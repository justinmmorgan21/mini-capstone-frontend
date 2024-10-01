import { Link } from "react-router-dom";
export function Header() {
  return (
    <header>
      <nav>
        <a href="#">Home</a> | <Link to="signup">Signup</Link> | <Link to="login">Login</Link> | <Link to="products">All Products</Link> | <Link to="products/new">New Product</Link>
      </nav>
    </header>
  )
}