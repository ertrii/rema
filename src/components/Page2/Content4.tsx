import { useDispatch, useListen } from "../../../lib";
import { Content3Action, Content3State } from "./Content3";

export default function Content4() {
  const { color } = useListen<Content3State>("content3");
  const dispatch = useDispatch<Content3Action>("content3");

  return (
    <div style={{ width: "100%", border: "1px solid black", padding: "20px" }}>
      <h2>Content 4</h2>
      <p style={{ color: color }}>Color actual 3: {color}</p>
      <button
        onClick={() => dispatch({ type: "CHANGE_COLOR", payload: "blue" })}
      >
        Azul
      </button>
      <button
        onClick={() => dispatch({ type: "CHANGE_COLOR", payload: "red" })}
      >
        Rojo
      </button>
      <button
        onClick={() => dispatch({ type: "CHANGE_COLOR", payload: "green" })}
      >
        Verde
      </button>
    </div>
  );
}
