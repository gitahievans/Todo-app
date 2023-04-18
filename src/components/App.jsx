import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./TodoList";
import Header from "./Header";
import Filter from "./Filter";
import localforage from "localforage";
import { ThemeContext } from "./ThemeContext";
// we use localforage to store our todos so that they are available even when the user leaves the browser

function App() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [activeTodos, setActiveTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);
  const [theme, setTheme] = useState("dark");
  const [clickedState, setClickedState] = useState("all");
  const [isDktp, setIsDktp] = useState(false);

  const toggleTheme = () => {
    return theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
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
    const updatedTodos = todos?.length ? [newTodo, ...todos] : [newTodo];
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

  useEffect(() => {
    const deviceSize = () => {
      setIsDktp(window.innerWidth >= 1000);
    };
    window.addEventListener("resize", deviceSize);
    deviceSize();
    return () => window.removeEventListener("resize", deviceSize);
  }, []);

  // filters all todos, setting active and complete todos arrays to null
  const handleAllTodos = () => {
    setTodos(todos);
    setActiveTodos([]);
    setCompleteTodos([]);
    setClickedState("all");
  };
  // filter all active todos setting the complete todos array to null
  const handleActiveTodos = () => {
    const active = todos.filter((todo) => !todo.completed);
    setActiveTodos(active);
    setCompleteTodos([]);
    setClickedState("active");
  };
  // filters all completed todos, setting the active todos array to null
  const handleCompleteTodos = () => {
    const completed = todos.filter((todo) => todo.completed);
    setCompleteTodos(completed);
    setActiveTodos([]);
    setClickedState("complete");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        id={theme}
        className="app"
        style={{
          background:
            theme === "dark" ? "hsl(235, 21%, 11%)" : "hsl(0, 0%, 98%)",
        }}
      >
        <Header />
        <form action="submit" onSubmit={handleSubmit} id="form">
          <div className="input-container">
            {" "}
            <div className="circle"></div>
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
          </div>
        </form>
        <TodoList
          todos={todos}
          setTodos={setTodos}
          activeTodos={activeTodos}
          completeTodos={completeTodos}
        />
        <Filter
          todos={todos}
          setTodos={setTodos}
          activeTodos={activeTodos}
          completeTodos={completeTodos}
          onSetActiveTodos={handleActiveTodos}
          onSetCompleteTodos={handleCompleteTodos}
          onSetAllTodos={handleAllTodos}
          clickedState={clickedState}
        />
        <div className="drag-drop">
          {isDktp ? <p>Drag and drop to reorder list</p> : null}
          <p>Double tap on todo text to edit</p>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
