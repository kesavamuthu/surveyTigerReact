import React from "react";

function Avatar(props) {
  return (
    <div>
      <img
        src={props.url}
        alt=""
        style={{ width: "5em", height: "5rem", color: "orange" }}
      />
    </div>
  );
}

export default Avatar;
