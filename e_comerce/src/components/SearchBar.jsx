//   import { useState } from "react";
//   import { products } from "../data/products";

// import { useNavigate } from "react-router-dom";

//    function SearchBar() {
    

//     const [query, setQuery] = useState("");
//     const [results, setResults] = useState([]);


//     function handleChange(e) {
//       const value = e.target.value;
//       setQuery(value); //  setting the value of userEntering in the input feild 

//       const filtered = products.filter(p =>
//         p.title.toLowerCase().includes(value.toLowerCase())
//       );

//       setResults(filtered);
//     }
// const navigate =  useNavigate(); // routing the page on another page

//   function itemSelected(id){
//       navigate(`/product/${id}`); // '/before the url '/' this replace same parameter'
   
//   }

//   console.log(results);

//     return (
//       <div>
//         <input
//           placeholder="-----------Search----------"
//           value={query}

//           onChange={handleChange}
//         />
         

//         {query && (
//           results.length === 0
//             ? <p>No Data Found</p>

//             : results.map(p => <div className="cursor-pointer" onClick={()=>itemSelected(p.id) } key={p.id}>{p.title}</div>)
//         )}
//       </div>
//     );
//   }

//   export default SearchBar
import { useState } from "react";
import { products } from "../data/products";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");

  const [results, setResults] = useState([]);


  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);
    const filtered = products.filter(p =>
      p.title.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
  }
  const navigate = useNavigate();

  function itemSelected(id) {
    navigate(`/product/${id}`);
    setQuery("");
    setResults([]);
  }

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Search Input Container */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={handleChange}
          className="w-full px-12 py-3 bg-white border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm text-gray-700"
        />
      </div>

      {/* Floating Autocomplete Dropdown */}
      {query && (
        <div className="absolute z-[100] w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden">
          {results.length === 0 ? (
            <div className="p-4 text-center text-gray-400 italic">No results found</div>
          ) : (
            <ul className="max-h-80 overflow-y-auto divide-y divide-gray-50">
              {results.map((p) => (
                <li
                  key={p.id}
                  onClick={() => itemSelected(p.id)}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors group"
                >
                  <img src={p.image} alt="" className="w-10 h-10 object-contain rounded bg-gray-100 p-1" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-600">{p.title}</span>
                    <span className="text-xs text-gray-500 font-medium">${p.price}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
