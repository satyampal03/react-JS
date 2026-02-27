import Header from "../components/Header";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import Footer from "../components/Footer";

import { products } from "../data/products";

function Home() {
  return (
    <>

      <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <Header />
        </header>

        <main className="flex-grow">
          <Hero />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-16 md:space-y-24 md:py-24">

            <CategorySection
              title="Category 1"
              products={products.filter(p => p.category === "cat1")}
            />

            {/* Decorative Divider between sections */}
            <hr className="border-gray-200" />

            <CategorySection
              title="Category 2"
              products={products.filter(p => p.category === "cat2")}
            />

          </div>
        </main>

        <Footer />
      </div>




    </>
  );
}

export default Home