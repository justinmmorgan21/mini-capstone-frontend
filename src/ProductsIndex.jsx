export function ProductsIndex({ products, onShow }) {
  return (
    <div>
      <h1 id="all-products">All Products</h1>
        <div className="cards">
        {
        products.map( product => (
          <div className="card" key={product.id}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <img src={product.images[0] && product.images[0].url} />
            <br /><br />
            <button onClick={()=>onShow(product)}>More Info</button>
          </div>
        ))
      }
      </div>
    </div>
  );
}