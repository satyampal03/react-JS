import { useState } from "react";
import { products } from "../data/products";

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

  return (
    <div>
      <input
        placeholder="Search..."
        value={query}
        onChange={handleChange}
      />

      {query && (
        results.length === 0
          ? <p>Not found</p>
          : results.map(p => <div key={p.id}>{p.title}</div>)
      )}
    </div>
  );
}


export default SearchBar 