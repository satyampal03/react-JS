import List from "./List";

function App(){
  const fruits = [{id:3071, name :'Orange', callories:86},
                    {id:3072, name :'Banana', callories:122},
                    {id:3073, name :'Apple', callories:196}, 
                    {id:3074, name :'Coconut', callories:96}, 
                    {id:3075, name :'Pineapple', callories :76}];

   const vegetables = [{id:3071, name :'Potato', callories:136},
                    {id:3072, name :'Tomato', callories:122},
                    {id:3073, name :'Onion', callories:66}, 
                    {id:3074, name :'Carrot', callories:96}, 
                    {id:3075, name :'Broccoli', callories :56}];
              
    const dryFruits = [{id:3071, name :'Almonds ', callories:146},
                    {id:3072, name :'Walnuts ', callories:122},
                    {id:3073, name :'Pistachios ', callories:166}, 
                    {id:3074, name :'Dates ', callories:86}, 
                    {id:3075, name :'Raisins ', callories :46}];

  return (
    <>
      <List category = 'Fruits' items = {fruits}/>
      <List category = 'Vegetables' items ={vegetables}/>
      <List category = 'DryFruits' items= {dryFruits}/>
    </>
  )
}

export default App;