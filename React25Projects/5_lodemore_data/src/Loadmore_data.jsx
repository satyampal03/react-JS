import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

 const LoadMore = () => {

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [disableButton, setDisableButton] = useState(false)

    // Error handling 

    async function fetchProducts(){
        try{    
            setLoading(true)

            const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${count ===0 ? 0: count*20}`)

            const result = await response.json();

            if(result && result.products && result.products.length){
                setProducts((prevData)=> [...prevData, ...result.products])
            setLoading(false)

            }
            console.log(result);
        }catch(err){
            console.log(err)
            setLoading(false)

        }
    }


    useEffect(()=>{
        fetchProducts()
    },[count])

     useEffect(()=>{
        if(products && products.length ===100) setDisableButton(true);
    },[products]);


  if (loading) return <div>Loading Data Please Wait</div>;

  return     (
    <div className='container'>
        <div className='product-Container'>{
                products && products.length ?
                products.map((item)=>{
                     return <div key={item.id}> 

                            <img src={item.thumbnail} alt={item.title} />
                                <p>{item.title}</p>
                     </div>
                }):null


            }
            </div>
            <div className='loadmore'> 
                <button onClick={()=>setCount(count+1)} disabled={disableButton} className='loadmore_button'>Load More Products</button>
                {
                       disableButton ? <p>You Have reached to 100 Products</p>: null
                }
            </div>
    </div>
  )
}

export default LoadMore

