import localforage from "localforage";
import React, { useState } from "react";
import cross from "../assets/cross.svg"
import check from '../assets/check.svg'
// import complete from '../assets/complete.mp3'
// import delete_tone from "../assets/delete_tone.mp3";

function Todo({ todo, todos, setTodos }) {
  const [todoHover, setTodoHover] = useState(false)
  // we update all our actions in our local storage to ensure they reflect even when the user refreshes the browser
  const handleDeleteClick = () => {
    const updatedTodos = todos.filter(myTodo => myTodo.id !== todo.id)
    setTodos(updatedTodos)
    localforage.removeItem('todos').then(() => {
      localforage.setItem('todos', updatedTodos)
    })
    deleteTodoAudio();
  };

  const deleteTodoAudio = () => {
    const audio = new Audio("src/assets/delete_tone.mp3");
    audio.play();
  }

  const todoDoneAudio = () => {
    const audio = new Audio("src/assets/complete.mp3");
    audio.play();
  }

  const handleCompletedClick = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: false };
      }
      return todo;
    });
    setTodos(updatedTodos);
    localforage.removeItem("todos").then(() => {
      localforage.setItem("todos", updatedTodos);
    });
      
  };
  
  const handleNotCompletedClick = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id){
        return {...todo, completed: true};
      }
      return todo;
    })
   setTodos(updatedTodos);
   localforage.removeItem("todos").then(() => {
     localforage.setItem("todos", updatedTodos);
   });
   todoDoneAudio();
  }

  const handleMouseEnter = () => {
    setTodoHover(true)
  }

  const handleMouseLeave = () => {
    setTodoHover(false);
  }

  return (
    <>
      <div
        className="to-do"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {todo.completed ? (
          <div
            className="checked"
            onClick={() => handleCompletedClick(todo.id)}
          >
            <img src={check} alt="" />
          </div>
        ) : (
          <div
            className="not-checked"
            onClick={() => handleNotCompletedClick(todo.id)}
          >
            <img src={check} alt="" style={{ display: "none" }} />
          </div>
        )}
        {todo.completed ? (
          <div className="todo-body">
            <p
              style={{
                textDecoration: "line-through",
                color: "gray",
              }}
            >
              {todo.body}
            </p>
          </div>
        ) : (
          <div className="todo-body">
            {" "}
            <p
              style={{
                transform: todoHover ? "translateX(20px)" : "translateX(0)",
                transition: "transform 0.3s ease-in-out",
              }}
            >
              {todo.body}
            </p>{" "}
          </div>
        )}
        <img
          src={cross}
          alt="delete"
          onClick={handleDeleteClick}
          style={{
            cursor: "pointer",
          }}
          className={todoHover ? "show-delete-icon" : "hide-delete-icon"}
        />
      </div>
    </>
  );
}

export default Todo;
