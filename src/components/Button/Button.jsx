import React from "react";
import style from "./Button.module.css";

function Button({ children, handleClick }) {
  return (
    <div className={style.box}>
      <button onClick={handleClick} className={style.button}>
        {children}
      </button>
    </div>
  );
}

export default Button;
