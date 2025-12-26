function List(props){

    const category = props.category;
    const listData = props.items;

    const listItems = listData.map(item => <li key={item.id}>{item.name} {item.callories}</li>)
    return  (
    <>
    <h1 className="category">{category}</h1>
    <ul className="list-items">{listItems}</ul>
    </>
    
    )
    

/*
// --------------------Sort----------------------------

                    //  Want to sort alfabates 
                    // fruits.sort((a,b) => a.name.localeCompare(b.name)); 

                    // want to sort the name in order of reverse 
                    // fruits.sort((a,b) => b.name.localeCompare(a.name));

                    // want to sort by callories numeric orders
                    // fruits.sort((a,b)=> a.callories - b.callories)
                    
                    // want to sort by the reverse callories 
                    fruits.sort((a,b) => b.callories-a.callories);

    const listItems = fruits.map(fruit => <li key={fruit.id}>{fruit.name} {fruit.callories}</li>)
    return <ul>{listItems}</ul>;*/

//------------------Filter ---------------------
/*
     // low callories fruits 
    //  const filterLowest = fruits.filter(fruit => fruit.callories < 100)

    //  Heigh callories fruits 
       const filterHeightesFruits = fruits.filter(fruit => fruit.callories> 100 );
    
    const listItems = filterHeightesFruits.map(fruit => <li key={fruit.id}>{fruit.name} {fruit.callories}</li>)
    return <ul>{listItems}</ul>;
*/

// -------------------Put data to main applicaiton----------
// use the data that come from the  parent 


}

export default List;