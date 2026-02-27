import React, { useEffect } from 'react'
import { useState } from 'react'
import User from './User'

const Github_profile = () => {

  const [userDetails, setUserDetails] = useState({name: "satyam", nameLength: ""});

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);



   async function fetchGitHubUserData(){
    setLoading(true);
      const res = await fetch(`https://api.github.com/users/${userName}`);

      const data = await res.json();
      console.log(data);
    data ? setUserData(data) && setLoading(false) && setUserName('') : null;
   }

   function handleSubmit(){
      fetchGitHubUserData();
   }

  
   useEffect(()=>{
    fetchGitHubUserData()
   },[])


loading ?  <div className="data_loading">Data is Loading</div> : null

  return (
    <div className='github_profile_container'> 
          <div className="input_wrapper">
            <input 
            type="text" 
            name="search-by-username"
            placeholder=' Enter Here GitHub username here..'

            // value={userName} //  set here actual user value if we want any prevalue set here 

            onChange={(e)=>setUserName(e.target.value)} // onChange we are setting the uservalue(jo v hm likh rhe hai wo sab {username} me set ho rha hai);
            />

            <button onClick={()=>handleSubmit()}>Submit</button>
          </div>

          {userData !== null ? <User  user={userData}/> : null}
    </div>
  )
}


export default Github_profile