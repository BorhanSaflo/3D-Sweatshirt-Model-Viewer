import React from "react";
import "./Button.css";

function Button({ name, Icon, isInput }) {
  return (
    <div>
      {isInput ? (
        [
          <input id="fileInput" type="file" className="btn" />,
          <label for="fileInput" className="btn">
            {Icon && (
              <p>
                <Icon fontSize="large" />
              </p>
            )}
          </label>,
        ]
      ) : (
        <button
          onClick={() => {
            console.log("click");
          }}
          className="btn"
        >
          {Icon ? (
            <p>
              <Icon fontSize="large" />
            </p>
          ) : (
            <p>{name}</p>
          )}
        </button>
      )}
    </div>
  );
}

export default Button;
