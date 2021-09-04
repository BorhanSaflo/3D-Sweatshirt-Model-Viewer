import React from "react";
import "./Button.css";

function Button({ name, Icon, clickAction }) {
  return (
    <div>
      <button onClick={clickAction} className="btn">
        {Icon ? (
          <p>
            <Icon fontSize="large" />
          </p>
        ) : (
          <p>{name}</p>
        )}
      </button>
    </div>
  );
}

export default Button;
