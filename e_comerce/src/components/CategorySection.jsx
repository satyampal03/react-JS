import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

function CategorySection({ title, products }) {

  const navigate = useNavigate();

  // console.log('product title ====>',title)
  // console.log('products ====>',products)

  const top3 = products.slice(0, 3);

  return (
    <section>
      <div className="row">
        <h3>{title}</h3>
        <button onClick={()=>navigate(`/category/${

          products.filter((item,index) =>{
            return item === 'cat1'
          })
          
          
          }`)}>View All</button>
      </div>

      <div className="grid">
        {top3.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

export default CategorySection