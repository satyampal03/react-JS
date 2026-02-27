import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
const navigate = useNavigate(); 
    const { addToCart } = useCart();

  function productClicked(item) {
    navigate(`/product/${item}`)
  }

  return (
    <div
      className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-indigo-100 overflow-hidden cursor-pointer"
      onClick={() => productClicked(product.id)}
    >
      {/* Image Container with Zoom Effect */}
      <div className="relative h-64 overflow-hidden bg-gray-200">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-sm font-bold text-yellow-600 flex items-center gap-1 shadow-sm">
          ⭐ {product.rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h4 className="text-lg font-bold text-gray-800 truncate group-hover:text-indigo-600 transition-colors">
          {product.title}
        </h4>
        <div className="flex justify-between items-center mt-3">
          <p className="text-2xl font-black text-indigo-600">
            ${product.price}
          </p>

          <button 
         onClick={(e) => {
              e.stopPropagation();     // ⭐ important
              addToCart(product);
            }}
          className="p-2 rounded-full bg-gray-100 text-g  ray-600 hover:bg-indigo-600 hover:text-white transition-colors">
            +
          </button>
        </div>
      </div>
    </div>
  );
}


export default ProductCard