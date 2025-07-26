import React from "react";

function TextInput({ title, state, setState }) {
  return (
    <React.Fragment>
      <span className="title">{title}</span>
      <input
        type="number"
        value={Number(state) || 0}
        onChange={(e) => setState(e.target.value)}
        placeholder={title}
      />
    </React.Fragment>
  );
}

export default TextInput;