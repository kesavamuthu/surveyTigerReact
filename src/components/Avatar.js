import React from "react";

function Avatar(props) {
  return (
    <div>
      <img
        src={props.url}
        alt="Tiger face"
        style={{ width: "5em", height: "5rem", color: "orange" }}
        title="Tiger survey page"
      />
    </div>
  );
}

export default Avatar;
