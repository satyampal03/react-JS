import { useState } from "react";
import userImg from './assets/image.png';
import userReact from './assets/react.svg';
import userpng from './assets/user.png';
import About from "./assets/bodyComponents/About";

function Body(props) {
const users =[
    {
       "id" : "1",
      "name": "Aisha Khan",
      "city": "Dubai",
      "age": 28,
      "profession": "Interior Designer",
      "profile_photo": userReact 
    },
    {
         "id" : "2",
      "name": "Omar Hassan",
      "city": "Abu Dhabi",
      "age": 34,
      "profession": "Software Engineer",
      "profile_photo": userImg 
    },
    {
         "id" : "3",
      "name": "Lina Ahmed",
      "city": "Sharjah",
      "age": 26,
      "profession": "Graphic Designer",
      "profile_photo": userpng 
    },
    {
         "id" : "4",
      "name": "Daniel Smith",
      "city": "New York",
      "age": 31,
      "profession": "Marketing Manager",
      "profile_photo": userImg 
    },
    {
         "id" : "5",
      "name": "Priya Nair",
      "city": "Mumbai",
      "age": 29,
      "profession": "Content Writer",
      "profile_photo": userImg 
    }
  ] 


  function cardClicked(index){
        console.log(`You Clicked ${index} No Index`);
  }


  function viewProfile(id){
    console.log(`${id} Profile Viewed SuccessFully`)
  }


  return (
    <>

    <About /> 
         
        <section className="services" id="services">
        
        <h2>OUR TEAM</h2>

        <div className="service-container">
        
    {
        users.map( (user, index)=>{
        
        
        return  <div className="card" key={index} onClick={() => cardClicked(index)}>
          <img src={user.profile_photo} alt={user.name} />
          <h3>{user.name}</h3>
          <p className="profession">{user.profession}</p>

          <div className="details">
            <p>
              <strong>City:</strong> {user.city}
            </p>
            <p>
              <strong>Age:</strong>{user.age}
            </p>
          </div>
          <button className="contact-btn" key={user.id} onClick={()=>viewProfile(user.id)}>View Profile</button>
        </div>
        })
    }


    </div>

      </section>

      

      <section className="projects" id="projects">
        <h2>Recent Projects</h2>

        <div className="project-grid">
          <div className="project">Feedback</div>
        </div>
      </section>
    </>
  );
}

export default Body;
