import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Header() {
  const themeContext = useContext(ThemeContext);
  return (
    <div className="header">
      <div className="mini">
        <h1>TODO</h1>
        <img
          src={
            themeContext.theme === "dark"
              ? "/assets/icon-sun.svg"
              : "/assets/icon-moon.svg"
          }
          alt=""
          onClick={themeContext.toggleTheme}
        />
      </div>
    </div>
  );
}

export default Header;
