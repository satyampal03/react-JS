import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

function CategorySection({ title, products }) {

  const navigate = useNavigate();

  // console.log('product title ====>',title)
  // console.log('products ====>',products)

  const top3 = products.slice(0, 3);



  function categoryClicked(){
    navigate('/category/cat1')
  }

  return (

    <section className="max-w-7xl mx-auto px-4 py-12 bg-white">

      <div className="flex items-center justify-between mb-8 border-l-4 border-indigo-600 pl-4">
        <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight capitalize">
          {title}
        </h3>
        <button
          onClick={() => categoryClicked()}
          className="group flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-widest"
        >
          View All
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>

      {/* Responsive Grid: 1 column on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {top3.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>

  );
}

export default CategorySection