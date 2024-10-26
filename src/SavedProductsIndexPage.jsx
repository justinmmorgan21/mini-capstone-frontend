import { useLoaderData, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios';

export function SavedProductsIndexPage() {
  //const cartedProducts = useLoaderData();

  const [savedProducts, setSavedProducts] = useState([]);
  // const [total, setTotal] = useState(0);

  const handleIndex = () => {
    axios.get("http://localhost:3000/saved_products.json").then(response=> {
      console.log(response.data[0]);
      setSavedProducts(response.data);
      // setTotal(response.data.total);
    })
  }

  useEffect( handleIndex, [] );

  const navigate = useNavigate();

  const addToCart = () => {
    axios.post("http://localhost:3000/orders.json").then(response => {
      navigate(`/orders/${response.data.id}`,{state: {id: response.data.id}});
    })
  }

  const handleDestroy = id => {
    // event.preventDefault();
    axios.delete(`http://localhost:3000/saved_products/${id}.json`).then(response => {
      setSavedProducts(savedProducts.filter(sp => sp.id !== id));
      // setTotal(response.data.total)
      // response.data
    })
  }

  return (
    <div>
    {
      savedProducts.message !== 'You must be logged in.' ?
      <>
        <h1 id="all-products">Saved For Later</h1>
        <div className="cards">
        {
          savedProducts.map( sp => (
            <div className="card" key={sp.id}>
              <h3>{sp.product.name}</h3>
              <p>${sp.product.price}</p>
              <p>{sp.product.description}</p>
              {sp.product.images.map((image) => (
                <div key={image.id}>
                  <img src={image.url} />
                </div>
              ))}
              <span style={{marginRight:32}}>Quantity: {sp.quantity} </span>
              <button onClick={()=>handleDestroy(sp.id)}>Remove</button>
              <button onClick={()=>addToCart()}>Add To Cart</button>
            </div>
          ))
        }
        </div>
        <hr />
        {/* <h3>Cart Total: ${total}</h3> */}
      </>
      :
      <h1>You must be logged in to see your cart</h1>
    }
    </div>
  );
}
