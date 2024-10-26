import { useLoaderData, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios';
import Stripe from 'stripe'

export function CartedProductsIndexPage() {
  const stripe = Stripe(import.meta.env.VITE_APP_SECRET_KEY)
  const [cartedProducts, setCartedProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const handleIndex = () => {
    axios.get("http://localhost:3000/carted_products.json").then(response=> {
      setCartedProducts(response.data.carted_products);
      setTotal(response.data.total);
    })
  }

  useEffect( handleIndex, [] );

  const navigate = useNavigate();

  const purchase = () => {
    axios.post("http://localhost:3000/orders.json").then(response => {
      stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: [
          'card',
        ],
        success_url: `http://localhost:5173/orders/${response.data.id}`,
        cancel_url: `http://localhost:5173/${response.data.id}`,
        line_items: [ // all arguments are required
          {
            price_data: {
              unit_amount: response.data.total * 100,
              currency: 'usd',
              product_data: {
                name: 'best shopping cart experience ever'
              },
            },
            quantity: 1,
          },
        ],
      }).then(session => {
        console.log(session)
        window.location.href = session.url
      })
    })
  }

  const handleDestroy = id => {
    // event.preventDefault();
    axios.delete(`http://localhost:3000/carted_products/${id}.json`).then(response => {
      setCartedProducts(cartedProducts.filter(cp => cp.id !== id));
      setTotal(response.data.total)
    })
  }

  return (
    <div>
    {
      cartedProducts.message !== 'You must be logged in.' ?
      <>
        <h1 id="all-products">Shopping Cart</h1>
        <div className="cards">
        {
          cartedProducts.map( cp => (
            <div className="card" key={cp.id}>
              <h3>{cp.product.name}</h3>
              <p>${cp.product.price}</p>
              <p>{cp.product.description}</p>
              {cp.product.images.map((image) => (
                <div key={image.id}>
                  <img src={image.url} />
                </div>
              ))}
              <span style={{marginRight:32}}>Quantity: {cp.quantity} </span>
              <button onClick={()=>handleDestroy(cp.id)}>Remove</button>
            </div>
          ))
        }
        </div>
        <hr />
        <h3>Cart Total: ${total}</h3>
        <button onClick={()=>purchase()}>Purchase</button>
      </>
      :
      <h1>You must be logged in to see your cart</h1>
    }
    </div>
  );
}
