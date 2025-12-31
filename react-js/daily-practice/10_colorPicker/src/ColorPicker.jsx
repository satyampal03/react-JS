import React, {useState} from "react";

function ColorPicker(){
    
    const [color, setColor] = useState('#FFFFFF');
    const [textColor, setTextColor] = useState('#');

    function colorPickerChange (e){
        setColor(e.target.value);
    }

    function textColorChanger (e){
        setTextColor(e.target.value);
    }
    return (
        <>
        <div className="colorPickerContainer" style={{background :color}}>
            <h1 style={{color:textColor}}>Color Picker</h1>
            <input type="color" onChange={textColorChanger} />
                {textColor}
            <p >You Selected Color : {color}</p>
             <label htmlFor="SelectColor">
                <input type="color" onChange={colorPickerChange} />
                {color}
             </label>
        </div>
        </>
    )
}

export default ColorPicker;