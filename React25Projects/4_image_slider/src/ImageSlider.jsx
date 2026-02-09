// import React from 'react'
// import { useEffect } from 'react';
// import { useState } from 'react'

//  const ImageSlider = ({ url, limit = 5, page = 1 }) => {

//     const [images, setImages] = useState([]);
//     const [currentSlide, setCurrentSlide] = useState(0)
//     const [errorMsg, setErrorMsg] = useState(null);
//     const [loading, setLoading] = useState(false);

//     useEffect(()=>{
//         if(url !== '') fetchImages(url) 


//         console.log('response of API ===>',images)
//     }, [url])

  
//   async function fetchImages(getURL){
//         try{

//             setLoading(true)

//             const response = await fetch (`${getURL}?   &limit=${limit}`);

//             const data = await response.json();

//             if(data){
//                 setImages(data);
//                 setLoading(false)
//             }


//         }catch(err){
//             setErrorMsg(err.message);
//             setLoading(false)
//         }
//     }

//     if(loading){
//         return  <div>Loading Data Please Wait</div>
//     }

//     if(loading !== null){
//         return  <div>Error Occured! {errorMsg}</div>
//     }

//   return (
//     <div className='Container'>

//     </div>
//   )
// }

// export default ImageSlider



import React, { useEffect, useState } from 'react';
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from 'react-icons/bs'  //react default icons

export const ImageSlider = ({ url, limit =1, page = 1 }) => {
    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetchImages(getURL) {
        try {
            setLoading(true);
            const response = await fetch(`${getURL}?page=${page}&limit=${limit}`);
            const data = await response.json();

            if (data) {
                setImages(data);
                setLoading(false);
            }
        } catch (err) {
            setErrorMsg(err.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (url !== '') fetchImages(url);

    }, [url, page, limit]); 


     console.log('images loading',images);

    if (loading) return <div>Loading Data Please Wait</div>;

    if (errorMsg) return <div>Error Occurred! {errorMsg}</div>;

       
    function handlePrevious(){
        setCurrentSlide(currentSlide === 0 ? images.length-1: currentSlide -1)
    }

    function handleNext(){
        setCurrentSlide(currentSlide === images.length-1 ? 0 : currentSlide + 1 )
    }


    return (
        <div className='Container'>

             <BsArrowLeftCircleFill 
             onClick={handlePrevious}
             className="arrow arrow-left"/>
           
            {
            
            images && images.length ?
            images.map((imageItem,index)=>{
                return <img
                 key={imageItem.id} 
                 alt={imageItem.download_url}
                 src={imageItem.download_url}
                 className={currentSlide === index? "current-image":"current-image hide-current-image"}
                 />
            })
            :null
        }

        <BsArrowRightCircleFill
        onClick={handleNext}
        className="arrow arrow-right"/>
        <span className='circle-indicators'>
            {
                images && images.length ?
                images.map((_,index)=>{
                    return <button
                    key={index}
                    className={currentSlide === index ? "current-indicator": "current-indicator hide-current-indicator"
                    }
                   
                   onClick={()=>setCurrentSlide(index)}
                    ></button>
                }):null
            }
        </span>
           
        </div>
    )
};

export default ImageSlider;