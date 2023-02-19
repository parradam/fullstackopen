import { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((prevState) => !prevState);
  };

  useImperativeHandle(refs, () => {
    return { toggleVisibility };
  });

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
});

export default Togglable;
