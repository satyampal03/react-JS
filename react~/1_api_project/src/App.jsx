import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  const getData = async (e) => {
    // console.log('dataFetched Successfully',e);
    const response = await axios.get(
      "https://picsum.photos/v2/list?page=2&limit=30",
    );

    console.log("Data From API ", response.data); // this responce coming from the api

    setData(response.data); // this data coming from the api

    console.log("Data From ourside ", data); // this is our data variable that we have created in the useState Variable
  };

useEffect(()=>{
  getData();
}) // help to auto render or load the api data




  return (
    <>
      <h1 className="text-3xl font-bold  italic text-white bg-teal-500 h-auto">
        Fetching Data using the API'S
      </h1>

      {/* Main Data loading From the Api */}

{/* 
        <button
          onClick={(e) => getData(e)}
          className="mt-10 bg-teal-500 text-white font-semibold text-auto px-6 py-3 rounded active:scale-98"
        >
          Get Data
        </button> */}
 
    <div className=" m-5 bg-black-500 grid grid-cols-3 gap-5">

{

  data.map((d,index)=>{
return <div className="max-w-sm bg-teal-200 rounded-xl shadow-lg overflow-hidden">
  <img 
    src={d.url} 
    className="w-full h-77 object-cover"
  />

  <div className="p-4">
    <h2 className="text-xl font-bold">{d.author}</h2>
    <p className="text-gray-500 mt-1">By</p>

    <a href="#" 
       className="inline-block mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
      View Details
    </a>
  </div>
</div>

       
  })

}
         </div>


          
    </>
  );
}

export default App;
