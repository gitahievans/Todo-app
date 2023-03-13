import localforage from "localforage";
import React from "react";

function Filter({ todos, setTodos, onSetCompleteTodos, onSetActiveTodos, onSetAllTodos }) {
  const showAllTodos = () => {
    onSetAllTodos();
  };

  const showActiveTodos = () => {
    onSetActiveTodos();
  };
  const showCompletedTodos = () => {
    onSetCompleteTodos();
  };

  return (
    <div className="filter-container">
      <span onClick={showAllTodos}>All</span>
      <span onClick={showActiveTodos}>Active</span>
      <span onClick={showCompletedTodos}>Completed</span>
    </div>
  );
}

export default Filter;

// const showActiveTodos = () => {
//   const updatedTodos = todos.filter((todo) => !todo.completed);
//   if (updatedTodos.length > 0) {
//     setTodos(updatedTodos);
//     localforage.removeItem("todos").then(() => {
//       localforage.setItem("todos", updatedTodos);
//     });
//     console.log("Active todos");
//   }
// };

// const showCompletedTodos = () => {
//   const updatedTodos = todos.filter((todo) => todo.completed);
//   if (updatedTodos.length > 0) {
//     setTodos(updatedTodos);
//     localforage.removeItem("todos").then(() => {
//       localforage.setItem("todos", updatedTodos);
//     });
//     console.log("Completed todos");
//   }
// };
