import axios from 'axios'
export function ProductsShow({product, onUpdate, onSave, onDestroy, onClose}) {

  const handleSubmit = event => {
    event.preventDefault();
    const params = new FormData(event.target);
    onUpdate(params, product.id, () => event.target.reset());
  }
  
  const handleCreate = (event, product_id) => {
    event.preventDefault();
    const params = new FormData(event.target);
    params.append('product_id', product_id);
    console.log(params);
    axios.post("http://localhost:3000/carted_products.json", params).then(response=> {
      console.log(response.data);
    });
    onClose();
  }

  const handleSave = (product_id) => {
    const params = { product_id: product_id };
    console.log(params);
    axios.post("http://localhost:3000/saved_products.json", params).then(response=> {
      console.log(response.data);
    });
    onClose();
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
      </form>

      <form onSubmit={(event) => handleCreate(event, product.id)}>
        <label htmlFor="quantity">Quantity: </label>
        <input type="number" name="quantity" defaultValue="1"/>
        <button type="submit">Add to cart</button>
      </form>
      <br />

        <button onClick={() => handleSave(product.id)}>Save for later</button>
        <button onClick={() => onDestroy(product.id)}>Delete</button>
    </div>
  );
}