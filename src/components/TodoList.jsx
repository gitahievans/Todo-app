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

  const handleDrag = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const handleDrop = (e, index) => {
    const draggedIndex = e.dataTransfer.getData("index");
    const newTodos = [...todos];
    const draggedItem = newTodos[draggedIndex];

    newTodos.splice(draggedIndex, 1);
    newTodos.splice(index, 0, draggedItem);

    setTodos(newTodos);
    localforage.setItem("todos", newTodos);
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
        <ul className="main-ul">
          {todos.map((todo, index) => {
            return (
              <li
                key={todo.id}
                draggable={true}
                onDragStart={(e) => handleDrag(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={(e) => e.preventDefault()}
              >
                <Todo todo={todo} setTodos={setTodos} todos={todos} />{" "}
                <div className="divider"></div>
              </li>
            );
          })}
          <div className="ul-bottom">
        <span>{todos && todos.length} Item(s) left</span>
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
