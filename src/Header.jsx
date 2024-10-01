import { Link } from "react-router-dom";
export function Header() {
  return (
    <header>
      <nav>
        <a href="#">Home</a> | <Link to="signup">Signup</Link> | <Link to="login">Login</Link>
      </nav>
    </header>
  )
}