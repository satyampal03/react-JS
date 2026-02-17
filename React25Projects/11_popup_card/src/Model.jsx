import React from 'react'

 const Model = ({id, header, body, footer, cut}) => {
  return (
    <div id={id || "Model"} className="modal" >
        <div className="content">
            <div className="header">
                    <span className='close-model-icon' onClick={cut}>&times;</span>
                    <h2>{header ? header : 'Header'}</h2>
            </div>

            <div className="body">
                {
                    body ? body :(
                        <p>This is the Body Section</p>
                    )
                }

            </div>
            <div className="footer">
                  {
                    footer ? footer :  
                    <h2> This is the Footer Section</h2>
                  }
            </div>
        </div>
    </div>
  )
}

export default Model
