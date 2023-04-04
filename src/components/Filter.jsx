import localforage from "localforage";
import React from "react";

function Filter({
  todos,
  setTodos,
  onSetCompleteTodos,
  onSetActiveTodos,
  onSetAllTodos,
}) {
  const showAllTodos = () => {
    onSetAllTodos();
  };

  const showActiveTodos = () => {
    onSetActiveTodos();
  };
  const showCompletedTodos = () => {
    onSetCompleteTodos();
  };

  const clearAllCompleted = () => {
    const updatedTodos = todos.filter((todo) => todo.completed === false);
    setTodos(updatedTodos);
    // we remove our exixting todos array from the local storage and replace it with the updated todos array.
    localforage.removeItem("todos").then(() => {
      localforage.setItem("todos", updatedTodos);
    });
    console.log(updatedTodos);
  };

  return (
    <div className="filter-container">
      {" "}
      <span className="dktp-span">{todos && todos.length} Item(s) left</span>
      <section className="filter">
        <span onClick={showAllTodos}>All</span>
        <span onClick={showActiveTodos}>Active</span>
        <span onClick={showCompletedTodos}>Completed</span>
      </section>
      <span
        onClick={clearAllCompleted}
        style={{ cursor: "pointer" }}
        className="dktp-span"
      >
        Clear completed
      </span>
    </div>
  );
}

export default Filter;
