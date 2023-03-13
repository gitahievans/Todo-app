import localforage from "localforage";
import React from "react";

function Todo({ todo, todos, setTodos }) {
  // we update all our actions in our local storage to ensure they reflect even when the user refreshes the browser
  const handleDeleteClick = () => {
    const updatedTodos = todos.filter(myTodo => myTodo.id !== todo.id)
    setTodos(updatedTodos)
    localforage.removeItem('todos').then(() => {
      localforage.setItem('todos', updatedTodos)
    })
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
      if (todo.id === id){
        return {...todo, completed: true};
      }
      return todo;
    })
   setTodos(updatedTodos);
   localforage.removeItem("todos").then(() => {
     localforage.setItem("todos", updatedTodos);
   });
  }

  return (
    <>
      <div className="to-do">
        {todo.completed ? (
          <div
            className="checked"
            onClick={() => handleCompletedClick(todo.id)}
          >
            <img src="src/assets/images/icon-check.svg" alt="" />
          </div>
        ) : (
          <div
            className="not-checked"
            onClick={() => handleNotCompletedClick(todo.id)}
          >
            <img
              src="src/assets/images/icon-check.svg"
              alt=""
              style={{ display: "none" }}
            />
          </div>
        )}
        {todo.completed ? (
          <p style={{ textDecoration: "line-through", color: "gray" }}>
            {todo.body}
          </p>
        ) : (
          <p>{todo.body}</p>
        )}
        <img
          src="src/assets/images/icon-cross.svg"
          alt="delete"
          onClick={handleDeleteClick}
          style={{ cursor: "pointer" }}
          className="delete-icon"
        />
      </div>
      <hr />
    </>
  );
}

export default Todo;
