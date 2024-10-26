import { useLoaderData, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios';

export function SavedProductsIndexPage() {

  const [savedProducts, setSavedProducts] = useState([]);

  const handleIndex = () => {
    axios.get("http://localhost:3000/saved_products.json").then(response=> {
      console.log(response.data[0]);
      setSavedProducts(response.data);
    })
  }

  useEffect( handleIndex, [] );

  const navigate = useNavigate();

  const handleDestroy = id => {
    axios.delete(`http://localhost:3000/saved_products/${id}.json`).then(response => {
      setSavedProducts(savedProducts.filter(sp => sp.id !== id));
    })
  }

  const addToCart = (event, savedProduct) => {
    event.preventDefault();
    const params = new FormData(event.target);
    params.append('product_id', savedProduct.product.id);
    console.log(params);
    axios.post("http://localhost:3000/carted_products.json", params).then(response=> {
      console.log(response.data);
      handleDestroy(savedProduct.id);
      navigate(`/carted`);
    });
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
              <form onSubmit={(event) => addToCart(event, sp)}>
                <label htmlFor="quantity"> quantity: </label>
                <input type="number" name="quantity" defaultValue="1" style={{width:30}}/>
                <button type="submit">Add to cart</button>
              </form>
              <br />
              <button onClick={()=>handleDestroy(sp.id)}>Remove</button>
            </div>
          ))
        }
        </div>
        <hr />
      </>
      :
      <h1>You must be logged in to see your cart</h1>
    }
    </div>
  );
}
