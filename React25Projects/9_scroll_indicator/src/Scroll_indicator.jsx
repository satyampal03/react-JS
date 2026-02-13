import React from 'react'
import { useEffect } from 'react';
import { use } from 'react';
import { useState } from 'react';

export const Scroll_indicator = ({url}) => {
// https://dummyjson.com/products
    const [data, setdata] = useState([]);
    const [loading, setLoading] = useState(false)

    const [error, setError] = useState('');

    const [scrollPercentage, setScrollPercentage] = useState(0);

    async function fetchData(gettedURL) {
         try{
            setLoading(true)
            const response = await fetch(gettedURL)

            const data = await response.json();


            if(data && data.products && data.products.length > 0){
                setdata(data.products)
                setLoading(false);
            }


         }catch(err){
               console.log(err);
                setError(e.message)
         }   
    }

    useEffect(()=>{

        fetchData(url);

    },[url])


    function handlescrollPercentage(){
        
        // console.log(
        //     document.body.scrollTop,
        //     document.documentElement.scrollTop,
        //     document.documentElement.scrollHeight,
        //     document.documentElement.clientHeight
        // );


        const howMuchScrolled = document.body.scrollTop || document.documentElement.scrollTop

        const height = document.documentElement.scrollHeight-document.documentElement.clientHeight 


        setScrollPercentage(howMuchScrolled/height*100);
    }   

    useEffect(()=>{
        window.addEventListener('scroll',handlescrollPercentage)

        return ()=>{
        window.removeEventListener('scroll', ()=>{})

        }
    }, [])


            console.log(data, scrollPercentage);

        // if we can some errors then this block will work here

       if (error) {
  return (
    <div className="error-wrapper">
      <div className="error-box">
        <h2>Something went wrong</h2>
        <p>We are facing a server issue.</p>
        <small>{error}</small>
      </div>
    </div>
  );
}

    
// loader
if (loading) {
  return (
    <div className="loader-wrapper">
      <span className="loader"></span>
      <p>Loading data, please wait...</p>
    </div>
  );
}


  return <>

    <div className="top_container">
         <h1>Custom Scroll Indicator</h1>
        <div className='scroll-progress-tracking-container'>
            <div className='current_progress_bar' style={{width : `${scrollPercentage}%  `}}> </div>
        </div>
    </div>
       
        <div className='data_container'>
            {
                data && data.length >0 ?  

                data.map(dataItem =>{
                    return<p>{dataItem.title}</p>
                })
                :
                null 
            }
        </div>
  </>
  
}

