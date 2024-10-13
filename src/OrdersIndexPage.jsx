import { useLoaderData } from "react-router-dom";

export function OrdersIndexPage() {
  let past_orders = useLoaderData();
  // console.log(past_orders);
  // console.log("OG: ");
  // console.log(past_orders);
  // console.log("Reversed: ");
  // console.log([...past_orders].reverse());

  return (
    <div>
    {
      past_orders.message !== 'You must be logged in.' ?
      <>
        <h1>Past Orders</h1>
        {[...past_orders].reverse().map( order => 
          <div key={order.id}>
            {order.carted_products.map( cp => (
              <div key={cp.id}>
              <p>{cp.product.name} (qty:{cp.quantity})</p>
              </div>
            ))}
            <h4>Subtotal: ${order.subtotal}, Tax: ${order.tax}</h4>
            <h3>Total Cost: ${order.total}</h3>
            <p>order created: {order.created_at.slice(0,-14)}</p>
            <hr />
          </div>
        )}
      </>
      :
      <h1>You must be logged in to see your past orders</h1>
    }
    </div>
  )
}