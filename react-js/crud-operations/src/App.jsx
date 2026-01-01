import React, { useEffect, useState } from "react";
import {EmployData} from "./EmployData";

function App (){
  const [data, setData] = useState([]);

  // States for new template data
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [age, setage] = useState(0);
  const [id, setId] = useState(0);

  // Just syncing the data
    
  useEffect(()=>{
    setData(EmployData)
  }, []);

  // Edit Feature
  const editData =(id, _)=>{
    const dt = data.filter((item,_,_)=>{
        return item.id === id; 
    })
  }

  // Delete Feature
    const deleteData =(id, index)=>{

    // delete by index 
    /*const deleteRow = data.filter((_, i)=>{
      return index !== i;
    })*/

      if(window.confirm(`Are you Sure to Delete this data`)){
      const deleteRow = data.filter((data, _)=>{
      return id !== data.id;
    })
    setData(deleteRow);
      }
  }

  // save Feature 
    const save = ()=>{

    }

    // clear Feature 
    const clear = ()=>{
      
    }



  return(<>

  <div className="container">

      <div className="crud-features">

        <div className="add-employe">
          <div>
          <label htmlFor="">First Name : 
            <input type="text" placeholder="Enter First Name" onChange={(e)=>setFname(e.target.value)}/> 
          </label>
          <label htmlFor="">Last Name : 
            <input type="text" placeholder="Enter Last Name"  onChange={(e)=>setLname(e.target.value)}/> 
          </label>

          <label htmlFor="">Age : 
            <input type="text" placeholder="Enter First Name"  onChange={(e)=>setAge(e.target.value)}/> 
          </label>

          </div>

          
        <div className="action-btns form-temp">
                  <button className="btn btn-edit" onClick={()=> save()}>Save</button>
                  <button className="btn btn-delete" onClick={()=> clear()}>Clear</button>
        </div>
        </div>

        
      </div>

      <div className="employData">
              <ul>
                <h4>Sr.No</h4>
                <h4>First Name</h4>
                <h4>Last Name</h4>
                <h4>Age</h4>
                <h4>Actions</h4>
              </ul>
            
            {/* List Rendring Here */}

          {data.map((item,index, _) =>{
            return (
              <ul key={index}>
                <li>{item.id}</li>
                <li>{item.fname}</li>
                <li>{item.lname}</li>
                <li>{item.age}</li>
                <li className="action-btns">
                  <button className="btn btn-edit" onClick={()=> editData(item.id,index)}>Edit</button>
                  {/* id that's why use that we can easily target the postion and the value of each n every data */}
                  <button className="btn btn-delete" onClick={()=> deleteData(item.id, index)}>Delete</button>
                </li>
              </ul>
            );

          })}
          </div>

       </div>
  </>)
}

export default App  