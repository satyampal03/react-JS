import React, { useEffect, useState } from "react";
import {EmployData} from "./EmployData";

function App (){

 

  const [data, setData] = useState([]);

  // States for new template data
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [age, setage] = useState(0);
  const [id, setId] = useState(0);

  const [updateBtn, setUpdateBtn] = useState(false);
  // Just syncing the data

  useEffect(()=>{
    setData(EmployData)
  }, []);

  // Edit Feature
  const editData =(id, _)=>{
    const dt = data.filter((item, _)=>{
        return item.id === id; 
    });

    setId(id); // it's updatind also the id on state and that will use in fix it's position see on [update function ]
    setFname(dt[0].fname);
    setLname(dt[0].lname);
    setage(dt[0].age);
    // if(dt !== undefined){
    //   setId(dt[0].id)
    // }

    setUpdateBtn(true);
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
    });
    setData(deleteRow);
      }
  }

  // save Feature 
    const save = (e)=>{
      e.preventDefault(); // will prevent the other event handlers
      const dt = [...data];

      const newData = {
        id:(data.length+1),
        fname:fname,
        lname:lname,
        age: age,

        // console.log(EmployData)
      }

      
  console.log('user current id => ',EmployData.length+1);
 console.log(EmployData)



     dt.push(newData);
      setData(dt);
      // console.log(dt.push(newData));
      console.log(data);

      clear();
    }

    // clear Feature 
    const clear = ()=>{
    setId('');
    setFname('');
    setLname('');
    setage('');

    setUpdateBtn(false);

    console.log(supabase);
    }


    // update feature
    const update = ()=>{
      const index = data.map((item, index,arr)=>{
        return item.id;
      }).indexOf(id);

      const dt = [...data]; // will take the all data

      dt[index].fname = fname; // insertiung first name 
      dt[index].lname = lname; // insertiung last name 
      dt[index].age = age; // insertiung age

      setData(dt);
      clear();

    }

  return(<>

  <div className="container">

      <div className="crud-features">

        <div className="add-employe">
          <div>
          <label htmlFor="">First Name : 
            <input type="text" placeholder="Enter First Name" onChange={(e)=>setFname(e.target.value)} value={fname}/> 
          </label>
          <label htmlFor="">Last Name : 
            <input type="text" placeholder="Enter Last Name"  onChange={(e)=>setLname(e.target.value)} value={lname}/> 
          </label>

          <label htmlFor="">Age : 
            <input type="text" placeholder="Enter First Name"  onChange={(e)=>setage(e.target.value)} value={age}/> 
          </label>

          </div>

          
        <div className="action-btns form-temp">
                 
                 {
                  !updateBtn ?
                  <button className="btn btn-edit" onClick={(e)=> save(e)}>Save</button>:
                  <button className="btn btn-edit" onClick={()=> update()}>Update</button>
                 } 
                  <button className="btn btn-delete" onClick={()=> clear()}>Clear</button>
        </div>
        </div>

        
      </div>

      <div className="employData">
              <ul>
                <h4>ID</h4>
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
                  <button className="btn btn-edit" onClick={()=> editData(item.id, index)}>Edit</button>
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