import React from 'react'


 const User = ({user}) => {

    const {avatar_url, followers, following, public_repos, url, name, login, created_at} = user;


  return <>
    <div className="user">
        <div className='avatar_container'>
            <img className="avatar" src={avatar_url} alt={user}/>
        </div>
        <div>
            <a href={`https://github.com/${login}`}>
                {name || login}
            </a>

            <p>User Joind At ${created_at}</p>

           <p></p>
        </div>
    </div>
  </>
}

export default User