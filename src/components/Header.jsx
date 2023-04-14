import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import sun from "../assets/sun.svg"
import moon from "../assets/moon.svg"

function Header() {
  const themeContext = useContext(ThemeContext);
  return (
    <div className="header">
      <div className="mini">
        <h1>TODO</h1>
        <img
          src={themeContext.theme === "dark" ? sun  : moon}
          alt="d/l"
          onClick={themeContext.toggleTheme}
        />
      </div>
    </div>
  );
}

export default Header;
