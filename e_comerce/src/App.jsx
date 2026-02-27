  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import Home from "./pages/Home";
  import ProductDetails from "./pages/ProductDetails";
  import CategoryPage from "./pages/CategoryPage";
  import Login from "./pages/Login";
  import Cart  from "./pages/Cart";

  const App = () => {
    return <>

          <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/category/:name" element={<CategoryPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>


     {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/category/:name" element={<CategoryPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>  */}




      {/* Browser Router DOM -  URL for navigation  
          /   → Home page
          /product/2 → Product page*/}

      {/* Routes is a container of all routes. */}

      {/* Route is one single page mapping. */}
    </>
  }

  export default App;