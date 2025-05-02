# RemaJS

Transfers state from one component to another and manipulates their values.

## Installation

```
npm install rema
```

Import provider

```tsx
import { RemaProvider } from "rema";

createRoot(document.getElementById("root")!).render(
  <RemaProvider>
    <App />
  </RemaProvider>
);
```

## Initialice states

```tsx
// MainComponent.jsx
import { useInit } from "rema";
function MainComponent() {
  const [state, setState] = useInit("MAIN_COMPONENT", { counter: 0 });
  return (
    <div>
      <p>{state.counter}</p>
      <button onClick={() => setState({ counter: state.counter + 1 })}>
        Counter
      </button>
    </div>
  );
}

// OtherComponent.jsx
import { useListen } from "rema";
function OtherComponet() {
  const { counter } = useListen("MAIN_COMPONENT");
  const emit = useEmit("MAIN_COMPONENT");
  return (
    <div>
      <p>{counter}</p>
      <button onClick={() => emit({ counter: state.counter + 1 })}>
        Counter
      </button>
    </div>
  );
}
```

## Using Reducer

```tsx
// MainComponent.tsx
import { useInitReducer } from "rema";
export interface MainComponentState {
  color: string;
}
export type MainComponentAction =
  | { type: "CHANGE_COLOR"; payload: string }
  | { type: "RESET_COLOR" };
function reducer(state: MainComponentState, action: MainComponentAction) {
  switch (action.type) {
    case "CHANGE_COLOR":
      return { ...state, color: action.payload };
    case "RESET_COLOR":
      return { ...state, color: "black" };
    default:
      return state;
  }
}
function MainComponent() {
  const [state, dispatch] = useInitReducer("MAIN_COMPONENT", reducer, {
    color: "black",
  });
  return (
    <div>
      <p style={{ color: state.color }}>{state.color}</p>
      <button
        onClick={() => dispatch({ type: "CHANGE_COLOR", payload: "red" })}
      >
        Red Color
      </button>
    </div>
  );
}

// OtherComponent.tsx
import { useListen } from "rema";
function OtherComponet() {
  const { color } = useListen("MAIN_COMPONENT");
  const dispatch = useDispatch("MAIN_COMPONENT");
  return (
    <div>
      <p style={{ color }}>{color}</p>
      <button
        onClick={() => dispatch({ type: "CHANGE_COLOR", payload: "blue" })}
      >
        Blue Color
      </button>
    </div>
  );
}
```

## Unsubscribe states

Resets the state when the component is unmounted

```tsx
function ParentComponent{
  useUnsubscribe("MAIN_COMPONENT")
  return <>{/*...*/}</>
}
```

## useReserve

Replaces the initial state that the parent component initializes.

```tsx
const emit = useReserve("MAIN_COMPONENT");

<button onClick={() => emit({ count: 7 })}>Prev states</button>;
```
