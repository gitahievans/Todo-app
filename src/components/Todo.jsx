import localforage from "localforage";
import React, { useState } from "react";
import cross from "../assets/cross.svg";
import check from "../assets/check.svg";
import complete from "../assets/complete.mp3";
import delete_tone from "../assets/delete_tone.mp3";

function Todo({ todo, todos, setTodos }) {
  const [todoHover, setTodoHover] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodoBody, setEditedTodoBody] = useState(todo.body);

  // we update all our actions in our local storage to ensure they reflect even when the user refreshes the browser
  const handleDeleteClick = () => {
    const updatedTodos = todos.filter((myTodo) => myTodo.id !== todo.id);
    setTodos(updatedTodos);
    localforage.removeItem("todos").then(() => {
      localforage.setItem("todos", updatedTodos);
    });
    deleteTodoAudio();
  };

  const deleteTodoAudio = () => {
    const audio = new Audio(delete_tone);
    audio.play();
  };

  const todoDoneAudio = () => {
    const audio = new Audio(complete);
    audio.play();
  };

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
      if (todo.id === id) {
        return { ...todo, completed: true };
      }
      return todo;
    });
    setTodos(updatedTodos);
    localforage.removeItem("todos").then(() => {
      localforage.setItem("todos", updatedTodos);
    });
    todoDoneAudio();
  };

  const handleMouseEnter = () => {
    setTodoHover(true);
  };

  const handleMouseLeave = () => {
    setTodoHover(false);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    setEditedTodoBody(event.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleInputBlur()
  }
}

  const handleInputBlur = () => {
    console.log({...todo})
    const editedTodo = { ...todo, body: editedTodoBody };
    const editedTodos = todos.map((t) => t.id === todo.id ? editedTodo : t) 
    setTodos(editedTodos);
    setIsEditing(false);
    localforage.removeItem("todos").then(() => {
      localforage.setItem("todos", editedTodos);
    });
  };

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
            {isEditing ? (
              <input
                type="text"
                value={editedTodoBody}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={(e) => handleKeyDown(e)}
                autoFocus
              />
            ) : (
              <p
                style={{
                  transform: todoHover ? "translateX(5px)" : "translateX(0)",
                  transition: "transform 0.3s ease-in-out",
                }}
                onDoubleClick={handleDoubleClick}
              >
                {todo.body}
              </p>
            )}
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
