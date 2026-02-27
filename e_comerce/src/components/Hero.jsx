import { products } from "../data/products";


function Hero() {

const randomItem = products[Math.floor(Math.random()*products.length)];

console.log(randomItem);
// {products.map(item => (
//   <div key={item.id}>{item.name}</div>  
// ))}


  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <img 
        src={randomItem.image} 
        alt={randomItem.title} 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 text-center px-4 max-w-3xl">
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          {randomItem.title}
        </h2>
        <p className="text-lg text-gray-200 mb-8">
          Explore the unique features of our latest release.
        </p>
      </div>
    </section>
  );
}

export default  Hero