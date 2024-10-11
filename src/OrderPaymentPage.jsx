import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect } from 'react'
import axios from 'axios';

export function OrderPaymentPage() {
  const order = useLoaderData();
  return (
    <div>
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
      <h2>Total Cost: ${order.total}</h2>
    </div>
  );
}