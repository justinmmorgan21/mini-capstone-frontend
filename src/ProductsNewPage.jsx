import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ProductsNew } from "./ProductsNew";

export function ProductsNewPage() {
  const navigate = useNavigate();

  const handleCreate = (params) => {
    console.log("handleCreate", params);
    axios.post("http://localhost:3000/products.json", params).then((response) => {
      console.log(response);
      navigate("/products");
    });
  };

  return (
    <div>
      <ProductsNew onCreate={handleCreate} />
    </div>
  );
}