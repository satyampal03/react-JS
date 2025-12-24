function rofilepicture (){

    const profilePic = './assets/satyam--.png';

    const eventHandling = (e) => {
        e.target.style.display = 'none';
    }
    return (
            <img onClick={(e) => eventHandling(e)} src={profilePic} alt="Image not Found" />
    )
}

export default Profilepicture