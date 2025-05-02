import { useInitReducer, useReserve } from "../../lib";
import { Content1States } from "../Page1/Content1";

export interface Content3State {
  color: string;
}

export type Content3Action =
  | { type: "CHANGE_COLOR"; payload: string }
  | { type: "RESET_COLOR" };

function reducer(state: Content3State, action: Content3Action) {
  switch (action.type) {
    case "CHANGE_COLOR":
      return { ...state, color: action.payload };
    case "RESET_COLOR":
      return { ...state, color: "black" };
    default:
      return state;
  }
}

export default function Content3() {
  const [state, dispatch] = useInitReducer("content3", reducer, {
    color: "black",
  });
  const content1 = useReserve<Content1States>("content1");
  function updatePage1() {
    content1({ count: 7 });
  }

  return (
    <div style={{ width: "100%", border: "1px solid black", padding: "20px" }}>
      <h2>Content 3</h2>
      <p style={{ color: state.color }}>Color Actual {state.color}</p>
      <button onClick={() => dispatch({ type: "RESET_COLOR" })}>
        Resetear
      </button>
      <button onClick={updatePage1}>Change number for page 1</button>
    </div>
  );
}
