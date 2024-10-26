import {useEffect, useState} from 'react'
import axios from 'axios'
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

  const loadSuppliers = () => {
    axios.get("http://localhost:3000/suppliers.json").then(response => {
      setSuppliers(response.data)
      console.log(response.data)
    })
  }

  const [suppliers, setSuppliers] = useState([])
  useEffect(loadSuppliers, []);

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
      <select name="supplier_id" id="supplier_id">
        {suppliers.map(supplier => (
          <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
        ))}
      </select>
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