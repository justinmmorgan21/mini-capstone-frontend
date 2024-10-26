import { Link } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";
import { useState, useEffect } from 'react'
import axios from 'axios'
export function Header() {

  const [currentUser, setCurrentUser] = useState({});

  const getUser = () => {
    axios.get("http://localhost:3000/users/current.json").then(response => {
      setCurrentUser(response.data);
    })
  }

  useEffect(getUser, []);

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
      <span>Welcome, {currentUser.name}</span>
    )
  }

  return (
    <header style={{ position: 'fixed', top: 0, width: '100%', backgroundColor: 'white', zIndex: 1 }}>
      <nav>
        <a href="#">Home</a> | <Link to="products">All Products</Link> | <Link to="products/new">New Product</Link> | <Link to="carted">Cart</Link> | <Link to="saved">Saved</Link> | <Link to="orders">Past Orders</Link> | {authLinks} | {welcomeUserMessage}
      </nav>
    </header>
  )
}
