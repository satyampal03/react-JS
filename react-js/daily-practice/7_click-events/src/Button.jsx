function Button (){
  // ----------------Normal Button Clicked ---------------
    /*
    // const handleClick = () => console.log('stop clicking!');
    const handleClick2 = (name) => console.log(`stop clicking!${name}`);
    return (
        <button className="btn" onClick={() => handleClick2('ram')}>Click Me🫡</button>
    )
    */


//--------------------Click event logically-------------------------
    /*
    let count = 0;
    const handleClick = (name) => {
          if(count < 3){
            count++;
            console.log(`${name} You Clicked ${count} times.`)
          }else{
            console.log(`${name} WTF STOP !`)
          }
    }

    return (
         <button className="btn" onClick={() => handleClick('ram')}>Click Me🫡</button>
    )*/

    // --------------------Event Target ------------------

    const handleClick = (e) => {

        console.log(e.screenX);
        console.log(e.screenY);

        e.target.textContent = 'i changed'
    };

    return  (
        <button className="btn " onClick={(e)=> handleClick(e)}>Click Me🫡</button>
    )

}

export default Button