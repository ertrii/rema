import { useContext } from "react";
import { RemaKeyName, RemaProviderContext } from "./contexts";
import useRenderChild from "./useRenderChild";

/**
 * Returns a function that can be used to emit a new value to the keyName
 */
export default function useEmit<T>(keyName: RemaKeyName) {
  const context = useContext(RemaProviderContext);
  const renderChild = useRenderChild(keyName);

  return function emit(value: ((prev: T) => T) | T) {
    if (typeof value === "function") {
      const nextValues = (value as (prev: T) => T)(
        context.getState(keyName) as T
      );
      context.saveState(keyName, nextValues);
    } else {
      context.saveState(keyName, value);
    }
    context.render(keyName);
    renderChild();
  };
}
