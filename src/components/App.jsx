import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./TodoList";
import Header from "./Header";
import Filter from "./Filter";
import localforage from "localforage";

// we use localforage to store our todos so that they are available even when the user leaves the browser

function App() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [activeTodos, setActiveTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);
  const [allTodos, setAllTodos] = useState([]);

  const handleChange = (e) => {
    // trim to ensure one can't input empty strings
    setValue(e.target.value.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // this object sets the properties of our todo.
    // we use a uuid to create a unique identifier for each todo.
    const newTodo = {
      id: uuidv4(),
      body: value,
      completed: false,
    };
    // we save the new array (having the new todo) in the local storage and also update our todos array by addinh the new todo
    const updatedTodos = todos?.length ? [newTodo, ...todos] : [newTodo]
    await localforage.setItem("todos", updatedTodos);
    setTodos(updatedTodos); //updating the todos array in the local storage suffices but if we want the new todo to render immediately it is created then we also update the todos array separately.
    setValue("");
  };

  // once the app is mounted, the todos are gotten from the local storage and rendered and used to update the todos array.
  useEffect(() => {
    localforage.getItem("todos").then((res) => {
      setTodos(res);
    });
  }, []);

  // filters all todos, setting active and complete todos arrays to null
  const handleAllTodos = () => {
    setAllTodos(todos);
    setActiveTodos([]);
    setCompleteTodos([]);
  };
// filter all active todos setting the complete todos array to null
  const handleActiveTodos = () => {
    const active = todos.filter((todo) => !todo.completed);
    setActiveTodos(active);
    setCompleteTodos([]);
  };
// filters all completed todos, setting the active todos array to null
  const handleCompleteTodos = () => {
    const completed = todos.filter((todo) => todo.completed);
    setCompleteTodos(completed);
    setActiveTodos([]);
  };

  return (
    <div id="app">
      <Header />
      <form action="submit" onSubmit={handleSubmit} id="form">
        <input
          type="text"
          placeholder="Create a new todo..."
          value={value}
          onChange={handleChange}
          onFocus={(e) => {
            e.target.value = "";
          }}
          required
        />
      </form>
      <TodoList
        todos={todos}
        setTodos={setTodos}
        activeTodos={activeTodos}
        completeTodos={completeTodos}
        allTodos={allTodos}
      />
      <Filter
        todos={todos}
        setTodos={setTodos}
        onSetActiveTodos={handleActiveTodos}
        onSetCompleteTodos={handleCompleteTodos}
        onSetAllTodos={handleAllTodos}
      />
    </div>
  );
}

export default App;
