import React, {useState} from 'react';

function ToDoList(){
    const [tasks, setTasks] = useState(['xTask','xTask']);

    const [newTask, setNewTask] = useState('');

    const [newCompletedTask, setNewCompletedTask] = useState([]);

    // ########################################
    const [updateValue, setUpdateValue] = useState('');

    function updateTask(index){
        
        const updateTask = tasks.filter((_,i)=>{
            return index === i;
        })
        
        const deleteTask = tasks.filter((_,i)=>{
            return index !== i;
        })
        setNewTask(updateTask);
        setTasks(deleteTask);
        
    }
// console.log(indexIs);
    function newupdatedTask(e){
        setNewTask(e.target.value)
    }

    // function valueChanged(){
    //     setTasks(newTaskUpdated => ([...newTaskUpdated,updateValue ]));
    //     setUpdateValue('');
    // }


    // function valueChanged(){
    //     if(updateValue.trim() !== ''){
    //         setTasks(newTaskUpdated => ([...newTaskUpdated,updateValue ]));
    //         setUpdateValue('');
    //     }

    //     console.log('Clicked');
    // }

    // ##############################################


    function updateNewTaskValue(event){
       setNewTask(event.target.value);
    }

    function addTask(){  

        if(newTask.trim() !== ''){
            setTasks(t => ([...t, newTask]));
            setNewTask('')
        }
       
    }

    function deleteTask(index){
        const updateTask = tasks.filter((_,i)=>{
            return i !== index;
        })

        setTasks(updateTask);
    }

    function moveTaskUp(index){
        if(index > 0){
            const updateTaskUp = [...tasks];
            [updateTaskUp[index], updateTaskUp[index-1]] = [updateTaskUp[index-1], updateTaskUp[index]]

            setTasks(updateTaskUp);


        }

    }


    function moveTaskDown(index){
            if(index < tasks.length-1){
                const updateTaskDown = [...tasks];
                [updateTaskDown[index], updateTaskDown[index+1]] = [updateTaskDown[index+1], updateTaskDown[index]]

                setTasks(updateTaskDown);
            }
    }


// Completed Task List

        function completedTask(index){

        const updateCompletedList = tasks.filter((_,i)=>{
            return i == index;
        })
        setNewCompletedTask(x => ([...x, updateCompletedList]));

        const updatePendingList = tasks.filter((_,i)=>{
            return i !== index;
        })
        setTasks(updatePendingList);

        console.log(updateCompletedList ,updatePendingList);

    }


    function deleteCompletedTask(index){
        const completedTaskUpdater = newCompletedTask.filter((_,i)=>{
            return i !== index;
        })

        setNewCompletedTask(completedTaskUpdater)


    }

    return (
        <>
        <div className='to-do-list' >
            <h1 className='project-name'>TO DO LIST</h1>
            <div className='newTask-add'>
                <input type="text" placeholder='Enter A Task' value={newTask} onChange={updateNewTaskValue}/>
                <button className='add-task' onClick={addTask}>Add</button>
                
            </div>
        <div className='pendingTask-Container'>
            <ol>
            <h2 className='pending'> Pending Taks</h2>
            {/* <div className='updateContent-box '  >
                <input className='editInput' type="text" placeholder='Edit Task' value = {updateValue} onChange={newupdatedTask}/>    
                <button className='editInput-btn' onClick={addTask}>✔️</button>
            </div> */}



            {tasks.map((task, index)=>{
                return <li key={index}><span className='task'> {task}</span> 
                   <div className='task-crud'>
                    <button className='updateTask' onClick={() => updateTask(index)}>Edit</button>
                    <button className='deleteTask' onClick={() => deleteTask(index)}>Delete</button>
                    <button className='completedTask' onClick={() => completedTask(index)}>Completed</button>
                    <button className='moveTask' onClick={() => moveTaskUp(index)}>⬆️</button>
                    <button className='moveTask' onClick={() => moveTaskDown(index)}>⬇️</button>
                    
                    </div> 
                </li>
            })}            
           </ol>
        </div>


     <div className='completedTask-Container'>
                <ol>
            <h2 className='completed'> Completed Taks</h2>
            {newCompletedTask.map((task, index)=>{
                return <li key={index}><span className='task'> {task}</span> 
                   <div className='task-crud'>
                    <button className='deleteTask' onClick={() => deleteCompletedTask(index)}>Delete</button>
                    </div> 
                </li>
            })}
           </ol>
           </div>
        </div>
        </>
    )
}

export default ToDoList;