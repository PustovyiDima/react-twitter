import { useContext } from "react";

import "./index.css";

import { THEME_TYPE, ThemeContext } from "../../App";

export default function Component({ children, className = "", style = {} }) {
   const theme = useContext(ThemeContext);
   return (
      <div
         style={{
            ...style,
            background: theme.theme === THEME_TYPE.DARK && "black",
            color: theme.theme === THEME_TYPE.DARK && "white",
            borderColor: theme.theme === THEME_TYPE.DARK && "#888",
         }}
         className={`box ${className}`}
      >
         {children}
      </div>
   );
}
