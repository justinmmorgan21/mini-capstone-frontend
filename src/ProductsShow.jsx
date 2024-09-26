export function ProductsShow({product, onUpdate, onDestroy}) {

  const handleSubmit = event => {
    event.preventDefault();
    const params = new FormData(event.target);
    onUpdate(params, product.id, () => event.target.reset());
  }
  
  return (
    <div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <p>{product.description}</p>
      <img src={product.images[0] && product.images[0].url} />
      <br /><br />
      <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name: </label>
      <input type="text" name="name" defaultValue={product.name}/><br />
      <label htmlFor="price">Price: </label>
      <input type="text" name="price" defaultValue={product.price}/><br />
      <label htmlFor="description">Description: </label>
      <input type="text" name="description" defaultValue={product.description}/><br />
      <button type="submit">Update</button>
      <br /><br />
      <button onClick={() => onDestroy(product.id)}>Delete</button>
    </form>
    </div>
  );
}