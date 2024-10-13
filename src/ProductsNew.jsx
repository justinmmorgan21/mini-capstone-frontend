import {useState} from 'react'
export function ProductsNew({ onCreate }) {

  const [images, setImages] = useState(["", ""])

  const handleSubmit = event => {
    event.preventDefault();
    const params = new FormData(event.target);
    console.log(params);
    onCreate(params, () => event.target.reset());
  }

  const addImages = () => {
    setImages([...images, ""])
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
      {images.map((image, id) => (
        <div key={id} >
          <label htmlFor='images[]'>Image Url: </label>
          <input type="text" name="images[]"/>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
    <button onClick={addImages}>Add more images</button>
    </div>
    </>
  );
}