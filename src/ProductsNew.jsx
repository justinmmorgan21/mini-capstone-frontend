export function ProductsNew(props) {

  const handleSubmit = event => {
    event.preventDefault();
    const params = new FormData(event.target);
    console.log(params);
    props.onCreate(params, () => event.target.reset());
  }

  return (
    <>
    <h1>New Product</h1>
    <div id="new-product-form">
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name: </label>
      <input type="text" name="name" /><br />
      <label htmlFor="price">Price: </label>
      <input type="text" name="price" /><br />
      <label htmlFor="description">Description: </label>
      <input type="text" name="description" /><br />
      <label htmlFor="supplier_id">Supplier: </label>
      <input type="text" name="supplier_id" /><br />
      <button type="submit">Submit</button>
    </form>
    </div>
    </>
  );
}