import {ProductsIndex} from './ProductsIndex.jsx';
import {ProductsShow} from './ProductsShow.jsx';
import {ProductsNew} from './ProductsNew.jsx';
import {Modal} from './Modal.jsx';
import {useState, useEffect} from 'react';
import axios from 'axios';

export function ProductsPage() {

  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  const handleIndex = () => {
    axios.get("http://localhost:3000/products.json").then(response => {
      setProducts(response.data);
    })
  }

  const handleShow = product => {
    setCurrentProduct(product);
    setModalVisible(true);
  }

  const handleCreate = (params, successCallback) => {
    axios.post("http://localhost:3000/products.json", params).then(response => 
      setProducts([...products, response.data])
    )
    successCallback();
  }

  const handleUpdate = (params, id, successCallback) => {

    axios.patch(`http://localhost:3000/products/${id}.json`, params).then(
      response => setProducts(products.map(product => product.id === id ? response.data : product))
    )
    successCallback();
    handleClose();
  }

  const handleDestroy = (id) => {
    console.log("destroy: " + id);
    axios.delete(`http://localhost:3000/products/${id}.json`).then( 
      response => setProducts(products.filter(product => product.id !== id))
    )
  }

  const handleClose = () => {
    setModalVisible(false);
  }

  useEffect(handleIndex, []);

  return (
    <main>
      <ProductsNew onCreate={handleCreate}/>
      <ProductsIndex products={products} onShow={handleShow}/>
      <Modal onClose={handleClose} show={modalVisible}>
        <ProductsShow 
          product={currentProduct} 
          onUpdate={handleUpdate}
          onDestroy={handleDestroy}
          />
      </Modal>
    </main>
  )
}