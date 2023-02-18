import { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((prevState) => !prevState);
  };

  return (
    <div>
      <button
        onClick={toggleVisibility}
        style={{ display: visible ? "none" : "" }}
      >
        {props.revealLabel || "Show"}
      </button>
      <div style={{ display: visible ? "" : "none" }}>{props.children}</div>
      <button
        onClick={toggleVisibility}
        style={{ display: visible ? "" : "none" }}
      >
        {props.hideLabel || "Hide"}
      </button>
    </div>
  );
};

export default Togglable;
