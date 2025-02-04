import useInit from "../../lib/useInit";

export default function Content1() {
  const { count } = useInit("content1", { count: 0 });

  return (
    <div style={{ width: "100%", border: "1px solid black", padding: "20px" }}>
      <h2>Content 1+</h2>
      <p>{count}</p>
    </div>
  );
}
