import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { useParams } from "react-router-dom";
import { products } from "../data/products";

import { useNavigate } from "react-router-dom";





const ProductDetails = () => {

  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  const navigate = useNavigate();

  function itemClicked(id){
    navigate(`/product/${id}`);
  }


  return (
    <>
      <Header />

      {/* 1. Main Product Section */}
<div className="max-w-7xl mx-auto p-6 md:p-12">
  <div className="flex flex-col md:flex-row gap-12 items-center bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
    
    {/* Product Image */}
    <div className="w-full md:w-1/2 overflow-hidden rounded-2xl bg-gray-50">
      <img 
        src={product.image} 
        alt={product.title} 
        className="w-full h-[400px] object-contain hover:scale-105 transition-transform duration-500"
      />
    </div>

    {/* Product Info */}
    <div className="w-full md:w-1/2 space-y-6">
      <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest">
        {product.category}
      </span>
      <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
        {product.title}
      </h2>
      <div className="flex items-center gap-4">
        <p className="text-3xl font-bold text-slate-900">${product.price}</p>
        <div className="h-6 w-px bg-gray-200"></div>
        <p className="text-amber-500 font-medium flex items-center gap-1">
          ⭐ {product.rating} <span className="text-gray-400 text-sm">(Customer Rating)</span>
        </p>
      </div>
      <button 
      onClick={() => addToCart(product)}
      className="w-full md:w-max px-12 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-indigo-600 transition-colors shadow-lg">
        Add to Cart
      </button>
    </div>
  </div>
</div>




{/* 2. Recommended Products Grid */}
<section className="bg-gray-50 py-20 px-6 md:px-12">
  <div className="max-w-7xl mx-auto">
    <h3 className="text-2xl font-black text-slate-900 mb-10">Related Products</h3>
    
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((item) => (
        <div 
          onClick={() => itemClicked(item.id)} 
          key={item.id} 
          className="group cursor-pointer flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          {/* Image Container */}
          <div className="aspect-square overflow-hidden bg-gray-50 p-6">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
              {item.title}
            </h3>
            <div className="flex items-center justify-between mt-4">
              <p className="text-lg font-black text-slate-900">${item.price}</p>
                    <button 
                    onClick={() => addToCart(product)}
                    className="w-full md:w-max px-12 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-indigo-600 transition-colors shadow-lg">
        Add to Cart
      </button>
              <p className="text-xs font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded-md">
                ★ {item.rating}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>




      <Footer />
    </>
  );
};

export default ProductDetails;