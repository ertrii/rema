import useEmit from "../../lib/useEmit";

export default function Content2() {
  const emit = useEmit<{ count: number }>("content1");

  function handleClick() {
    emit((prev) => ({
      count: prev.count + 1,
    }));
  }

  return (
    <div style={{ width: "100%", border: "1px solid black", padding: "20px" }}>
      <h2>Content 2</h2>
      <button onClick={handleClick}>Contar</button>
    </div>
  );
}
