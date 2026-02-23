import Header from "../components/Header";
import CategorySection from "../components/CategorySection";
import Footer from "../components/Footer";

import { products } from "../data/products";

 const CategoryPage = () => {
  return <>
        <Header />

      <CategorySection
        title="Category 1"
        products={products.filter(p => p.category === "cat1")}
      />

      <CategorySection
        title="Category 2"
        products={products.filter(p => p.category === "cat2")}
      />

      <Footer />
  </>
}

export default CategoryPage