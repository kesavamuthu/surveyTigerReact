import React from "react";
import { Card, Button } from "react-bootstrap";

function Avatar(props) {
  return (
    <img
      src={props.url}
      alt=""
      style={{ width: "5em", height: "5rem", color: "orange" }}
    />
  );
}

export default Avatar;
