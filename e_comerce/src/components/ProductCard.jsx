import { useNavigate } from "react-router-dom";

 function ProductCard({ product }) {

  const navigate = useNavigate();

  // console.log('==> ',navigate)

  return (
    <div
      className="card"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <img src={product.image} width="120" />
      <h4>{product.title}</h4>
      <p>{product.price}</p>
      <p>⭐ {product.rating}</p>
    </div>
  );
}


export default ProductCard