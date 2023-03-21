import React from "react";
import Todo from "./Todo";
import localforage from "localforage";

function TodoList({ todos, setTodos, completeTodos, activeTodos, allTodos }) {
  // to clear completed todos, we filter them out form the todos array and remain with uncompleted ones which we use to update our todos array
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
    <div className="todo-list">
      {activeTodos && activeTodos.length > 0 ? (
        activeTodos.map((todo) => {
          return (
            <li key={todo.id}>
              <Todo todo={todo} />
            </li>
          );
        })
      ) : completeTodos && completeTodos.length > 0 ? (
        completeTodos.map((todo) => {
          return (
            <li key={todo.id}>
              <Todo todo={todo} />
            </li>
          );
        })
      ) : allTodos && allTodos.length > 0 ? (
        allTodos.map((todo) => {
          return (
            <li key={todo.id}>
              <Todo todo={todo} />
            </li>
          );
        })
      ) : todos && todos.length > 0 ? (
        <ul>
          {todos.map((todo) => {
            return (
              <li key={todo.id}>
                <Todo todo={todo} setTodos={setTodos} todos={todos} />
              </li>
            );
          })}
          <div className="ul-bottom">
            <span>{todos.length} Item(s) left</span>
            <span onClick={clearAllCompleted} style={{ cursor: "pointer" }}>
              Clear completed
            </span>
          </div>
        </ul>
      ) : (
        <div className="no-todos">
          <p style={{ color: "red" }}>You have no tasks!</p>
        </div>
      )}
    </div>
  );
}

export default TodoList;
