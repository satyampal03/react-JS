import React, { useState, useEffect } from "react";

function MyComponent() {
  return (
    <>
      {
        <div className="container">
          <h1>To-Do List</h1>

          <div className="input-area">
            <input type="text" placeholder="Add a new task..." />
            <button>+ Add</button>
          </div>

          <div className="task">
            <div className="left">
              <input type="checkbox" />
              <span>Sample Task</span>
            </div>
            <div>
              <button className="editBTNTask">✎</button>
              <button className="deleteBTN">🗑</button>
            </div>
          </div>

          <div className="task completed">
            <div className="left">
              <input type="checkbox" checked />
              <span>Completed Task</span>
            </div>
            <div>
              <button className="editBTNCompleted">✎</button>
              <button className="deleteBTNCompleted">🗑</button>
            </div>
          </div>

          <div className="task editing">
            <div className="left">
              <input type="checkbox" />
              <input type="text" value="Editable Task" />
              <span>Editable Task</span>
            </div>
            <div>
              <button className="saveBTN">Save</button>
              <button className="taskEditBTN">✎</button>
              <button className="taskDeleteBTN">🗑</button>
            </div>
          </div>

          <div className="footer">
            <span>0 tasks left</span>
            <div className="filters">
              <button>
                <b>All</b>
              </button>
              <button>Active</button>
              <button>Completed</button>
            </div>
          </div>

          <button className="clear-btn">Clear Completed</button>
        </div>
      }
    </>
  );        
}

export default MyComponent;
