import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect } from 'react'
import axios from 'axios';

export function OrderPaymentPage() {
  const order = useLoaderData();
  return (  
    <div>
      <h1 style={{textAlign: 'center'}}>Order Confirmed!</h1>
      <h3>Checkout Receipt</h3>
      {
        order.carted_products.map( cp => (
          <div key={cp.id}>
            <p>name: {cp.product.name}</p>
            <p>price: ${cp.product.price}</p>
            <p>quantity: {cp.quantity}</p>
            <hr />

          </div>
        ))
      }
      <h3>Subtotal: ${order.subtotal}</h3>
      <h3>Tax: ${order.tax}</h3>
      <hr />
      <h3>Total Cost: ${order.total}</h3>
    </div>
  );
}