
import PropTypes from 'prop-types';

function Student(props){
    return (
        <div className="student">
            <p>Name : {props.name}</p>
            <p>Age : {props.age}</p>
            <p>Friend : {props.friend}</p>
        </div>
    )
}

Student.propTypes = {
    Name : PropTypes.string,    
    Age : PropTypes.number,
    Friend : PropTypes.string,
}

// Student.defaultProps = {
//     Name : 'Guest',    
//     Age : 0,
//     Friend : 'Naveen',
// }

// Default Prop does not work in latest react 19.x

export default Student