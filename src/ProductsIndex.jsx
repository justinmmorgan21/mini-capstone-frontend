import { useState } from 'react';

export function ProductsIndex({ products, onShow }) {
  console.log(products)
  const[searchTerms, setSearchTerms] = useState("");
  return (
    <div>
      {/* <h1 style={{ position: 'fixed', top: 70, width: '100%', backgroundColor: 'white', zIndex: 1 }}>All Products</h1> */}
      <h1 id="all-products">All Products</h1>
      <span>Search: <input type="text" value={searchTerms} onChange={(event)=>setSearchTerms(event.target.value)}/></span>

        <div className="cards">
        {
        products.filter(product=>product.name.toLowerCase().includes(searchTerms.toLowerCase())).map( product => (
          <div className="card" key={product.id}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            {product.images.map((image) => (
              <div key={image.id}>
                <img src={image.url} />
              </div>
            ))}
            <br /><br />
            <button onClick={()=>onShow(product)}>{product.name}</button>
          </div>
        ))
      }
      </div>
    </div>
  );
}