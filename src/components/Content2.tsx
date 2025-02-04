import useEmit from "../../lib/useEmit";
import useListen from "../../lib/useListen";

export default function Content2() {
  const emit = useEmit<{ count: number }>("content1");
  const { count } = useListen("content1", { count: 0 });

  function handleClick() {
    emit((prev) => ({
      count: prev.count + 1,
    }));
  }

  return (
    <div style={{ width: "100%", border: "1px solid black", padding: "20px" }}>
      <h2>Content 2</h2>
      <button onClick={handleClick}>Contar</button>
      <p>Contador que viene del content1: {count}</p>
    </div>
  );
}
