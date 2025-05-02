import { useState } from "react";
import { useInit, useUnsubscribe } from "../../lib";

export interface Content1States {
  count: number;
}

export default function Content1() {
  const [states, setStates] = useInit<Content1States>("content1", { count: 0 });
  const [, render] = useState({});
  useUnsubscribe("content1");

  function handleClick() {
    setStates({ count: states.count + 1 });
  }

  return (
    <div style={{ width: "100%", border: "1px solid black", padding: "20px" }}>
      <h2>Content 1+</h2>
      <p>{states.count}</p>
      <button onClick={handleClick}>Contar</button>
      <button onClick={() => render({})}>UP</button>
    </div>
  );
}
