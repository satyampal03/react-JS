import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

const Cart = () => {

  const { cartItems } = useCart();


// remove item From the Cart 

function removeFromCart(userItemCliked, useItemId){

    
    const productId = cartItems[0].id
    if(productId === useItemId){
        console.log('Item Removed SuccessFully ')
    }
}



  return (
    <>
      <Header />

      <div className="max-w-5xl mx-auto px-6 py-12">

        <h2 className="text-3xl font-black mb-8">Your Cart</h2>

        {cartItems.length === 0 ? (
          
              <div className="flex h-screen items-center justify-center bg-gray-100">
  <div className="text-center">
    <h1 className="text-6xl font-bold text-indigo-600">404</h1>
    <p className="text-2xl font-medium text-gray-800 mt-4">Page Not Found</p>
    <a href="/" className="mt-6 inline-block px-6 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition">
      Go Home
    </a>
  </div>
</div>

        ) : (
          <div className="space-y-6">
  {cartItems.map((item, index) => (
    <div
      key={item.id + "-" + index}
      className="flex flex-col sm:flex-row items-center gap-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-lg transition-shadow"
    >
      {/* Image */}
      <div className="flex-shrink-0 w-28 h-28 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-contain p-2"
        />
      </div>

      {/* Product info */}
      <div className="flex-1 w-full">
        <h4 className="text-lg font-semibold text-slate-900 leading-snug">
          {item.title}
        </h4>
        <p className="mt-1 text-sm text-slate-500 capitalize">
          {item.category}
        </p>

        <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
          <span className="bg-slate-100 px-2 py-1 rounded-md font-medium">
            Rating {item.rating} ⭐
          </span>
        </div>
      </div>

      {/* Price + action */}
      <div className="flex flex-col items-end gap-3">
        <p className="text-xl font-black text-indigo-600">
          ${item.price}
        </p>

        <button
        onClick={()=>removeFromCart(index, item.id)}
          className="rounded-lg border border-gray-200 px-4 py-1.5 text-sm font-semibold text-slate-600 hover:bg-red-50 hover:text-red-600 transition"
        >
          Remove
        </button>
      </div>
    </div>
  ))}
</div>
        )}

      </div>

      <Footer />
    </>
  );
};

export default Cart;



