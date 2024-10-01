import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

import { ProductsIndex } from "./ProductsIndex";
import { ProductsShow } from "./ProductsShow";
import { Modal } from "./Modal";

export function ProductsIndexPage() {
  const products = useLoaderData();
  // const navigate = useNavigate();
  
  const [modalVisible, setModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  const handleShow = product => {
    setCurrentProduct(product);
    setModalVisible(true);
  }

  const handleClose = () => {
    console.log("Close");
    setModalVisible(false);
  }

  const handleUpdate = (params, id, successCallback) => {

    axios.patch(`http://localhost:3000/products/${id}.json`, params).then(
      // response => setProducts(products.map(product => product.id === id ? response.data : product))
    )
    successCallback();
    handleClose();
  }

  const handleDestroy = (id) => {
    console.log("destroy: " + id);
    axios.delete(`http://localhost:3000/products/${id}.json`).then( 
      // response => setProducts(products.filter(product => product.id !== id))
    )
  }

  // const handleShow = (product) => {
  //   console.log("handleShow", product);
  //   navigate(`/products/${product.id}`);
  // };

  return (
    <div>
      <ProductsIndex products={products} onShow={handleShow} />
      <Modal onClose={handleClose} show={modalVisible}>
        <ProductsShow
          product={currentProduct} 
          onUpdate={handleUpdate}
          onDestroy={handleDestroy}
          />
      </Modal>
    </div>
  );
}