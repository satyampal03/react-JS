import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import CategoryPage from "./pages/CategoryPage";

const App = () => {
  return <>
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/category/:name" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter> 

    {/* Browser Router DOM -  URL for navigation  
        /   → Home page
        /product/2 → Product page*/}

    {/* Routes is a container of all routes. */}

    {/* Route is one single page mapping. */}
  </>
}

export default App;