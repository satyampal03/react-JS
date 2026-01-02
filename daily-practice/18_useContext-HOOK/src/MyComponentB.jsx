import MyComponentC from "./MyComponentC"

function MyComponentB(props){

    return (<>
    <div className="container">
        <h1>ComponentB</h1>
                <MyComponentC />
    </div>
    </>)
}

export default MyComponentB