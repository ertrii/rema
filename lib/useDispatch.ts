/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { RemaKeyName, RemaProviderContext } from "./contexts";
import useRenderChild from "./useRenderChild";

export default function useDispatch<A>(keyName: RemaKeyName) {
  const context = useContext(RemaProviderContext);
  const renderChild = useRenderChild(keyName);
  return function dispatch(action: A) {
    const metadata = context.getSubscribe(keyName);
    const states = context.getState(keyName);
    if (metadata?.reducer && states) {
      context.saveState(keyName, metadata.reducer(states, action));
      context.render(keyName);
      renderChild();
    }
  };
}
