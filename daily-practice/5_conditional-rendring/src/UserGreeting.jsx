function UserGreeting(props){
    
    const welcome_message = <h2 className="welcome_message">Welcome {props.username} Loggin Successfully</h2>;
    const login_message = <h2 className="login_message">Please Login to Continoue</h2>;
    
    // if(props.isLoggedIn){
    //     return <h2 className="welcome_message">Welcome {props.username} Loggin Successfully</h2>;
    // }else{
    //     return <h2 className="login_message">Please Login to Continoue</h2>;
    // }

    return (props.isLoggedIn ? welcome_message: login_message );
}


// UserGreeting.proptypes = {
//     isLoggedIn : PropTypes.bool,
//     username : PropTypes.string,
// }
// UserGreeting.defaultProps = {
//     isLoggedIn :false,
//     username : 'Guest',
// }

// there is not availble any default condition

export default UserGreeting;