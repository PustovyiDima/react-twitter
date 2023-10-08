import { memo, useContext } from "react";

import "./index.css";

import { THEME_TYPE, ThemeContext } from "../../App";

import Grid from "../grid";

function Component({ username, date, text }) {
   const theme = useContext(ThemeContext);
   return (
      <Grid>
         <div className={`post-content post-content--${theme.theme}`}>
            <span
               className={`post-content__username post-content__username--${theme.theme}`}
            >
               @{username}
            </span>
            <span
               className={`post-content__date post-content__date--${theme.theme}`}
            >
               {date}
            </span>
         </div>
         <p className={`post-content__text post-content__text--${theme.theme}`}>
            {text}
         </p>
      </Grid>
   );
}

export default memo(Component);
