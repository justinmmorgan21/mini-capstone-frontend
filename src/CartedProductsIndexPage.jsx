import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect } from 'react'
import axios from 'axios';

export function CartedProductsIndexPage() {
  const carted_products = useLoaderData();

  const navigate = useNavigate();

  const purchase = () => {
    axios.post("http://localhost:3000/orders.json").then(response => {
      navigate(`/orders/${response.data.id}`,{state: {id: response.data.id}});
    })
  }

  const handleDestroy = id => {
    // event.preventDefault();
    axios.delete(`http://localhost:3000/carted_products/${id}.json`).then(response => {
      console.log("removed");
      // response.data
    })
  }

  const calcTotal = () => {
    const subtotal = carted_products.reduce((acc,cp) => acc + cp.product.price * cp.quantity, 0);
    return (subtotal * 1.09).toFixed(2);
  }

  return (
    <div>
      <h1 id="all-products">Shopping Cart</h1>
        <div className="cards">
        {
          carted_products.map( cp => (
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
        <h3>Cart Total: ${calcTotal()}</h3>
        <button onClick={()=>purchase()}>Purchase</button>
    </div>
  );
}
