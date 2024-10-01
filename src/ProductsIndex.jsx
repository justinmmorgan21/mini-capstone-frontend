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