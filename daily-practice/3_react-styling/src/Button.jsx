function Button(){
   
   // inline css
    const styles = {
    height:"40px",
    width: "120px",
    border:"none",
    borderRadius: "5px",
    color: 'aliceblue',
    backgroundColor: 'black',
    fontSize: "17px",
    fontWeight: "400",
    }

    
    return (
        <button style={styles}> Click Me</button>
    )
}

export default Button;