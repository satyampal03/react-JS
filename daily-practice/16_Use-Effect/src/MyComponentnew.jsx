import React, { useState, useEffect } from "react";

/*
useEffect(function, [dependencies])
useEffect(() => {})
// Runs after every re-render
useEffect(() => {}, [])
// Runs only on mount
useEffect(() => {}, [value])
// Runs on mount + when value changes

*/
function MyComponentNew() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  window.addEventListener("resize", handleResize);
  console.log("EventListner LOA");

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    console.log("EVENT LISTENER ADDED");
    return () => {
      window.removeEventListener("resize", handleResize);
      console.log("EVENT LISTENER REMOVED");
    };
  }, []);

  useEffect(() => {
    document.title = ` size :${height} x ${width}`;
  }, [height, width]);

  function handleResize() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }
  
  return (
    <>
      <p>WINDOW HEIGHT : {height}</p>
      <p>WINDOW WIDTH : {width}</p>
    </>
  );
}

export default MyComponentNew;