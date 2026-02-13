import React from 'react'
import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react';



 const Qrcode_generator = () => {

    const [qrCode, setQrCode] = useState('')
    const [input, setInput] = useState('')

function handleQrCodeGen(){
        setQrCode(input)

}


  return <>
            <div className='container'>
            <h2>QR Code Generator</h2>
            <input onChange={(e)=> setInput(e.target.value)} 
            type='text'
            placeholder='Please Enter Your Name' 
            name='qr_code'/>
            <button onClick={handleQrCodeGen}
            className='generate_button'
            disabled={input && input.trim() !== ''? false :true}
            >Generate </button>
        </div>
        <div className='qr_code'>

            {/* qrcode size={400} bgcolor='white' */}
                <QRCodeSVG
                    id='qr-code-value'
                    value={qrCode}
                        >
                       
                </QRCodeSVG>
        </div>
    </>
}

export default Qrcode_generator