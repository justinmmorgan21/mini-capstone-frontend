export function ProductsShow({product, onUpdate, onDestroy}) {

  const handleSubmit = event => {
    event.preventDefault();
    const params = new FormData(event.target);
    onUpdate(params, product.id, () => event.target.reset());
  }
  
  return (
    <div className="show-product-div">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <p>{product.description}</p>
      {product.images.map((image, id) => (
              <div key={image.id}>
                <img src={image.url} />
              </div>
            ))}
      <br /><br />
      <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name: </label>
      <input type="text" name="name" defaultValue={product.name}/><br />
      <label htmlFor="price">Price: </label>
      <input type="text" name="price" defaultValue={product.price}/><br />
      <label htmlFor="description">Description: </label>
      <input type="text" name="description" defaultValue={product.description}/><br />
      <label htmlFor='images[]'>Image Url: </label>
      <input type="text" name="images[]"/><br />
      <button type="submit">Update</button>
      <br /><br />
      <button onClick={() => onDestroy(product.id)}>Delete</button>
    </form>
    </div>
  );
}