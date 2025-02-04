import { useInit } from "../../lib";

export default function Content1() {
  const [states, setStates] = useInit("content1", { count: 0 });

  function handleClick() {
    setStates((prev) => ({
      count: prev.count + 1,
    }));
  }

  return (
    <div style={{ width: "100%", border: "1px solid black", padding: "20px" }}>
      <h2>Content 1+</h2>
      <p>{states.count}</p>
      <button onClick={handleClick}>Contar</button>
    </div>
  );
}
