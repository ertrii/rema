import { useCallback, useContext } from "react";
import {
  RemaKeyName,
  RemaProviderContext,
} from "../contexts/RemaProviderContext";
import useRenderChild from "./useRenderChild";

/**
 * Returns a function that can be used to emit a new value to the keyName
 */
export default function useEmit<T>(keyName: RemaKeyName) {
  const context = useContext(RemaProviderContext);
  const renderChild = useRenderChild(keyName);
  return useCallback(function (value: ((prev: T) => T) | T) {
    if (typeof value === "function") {
      const fn = value as (prev: T) => T;
      const nextValues = fn(context.values.current[keyName] as T);
      context.saveValues(keyName, nextValues);
    } else {
      context.saveValues(keyName, value);
    }
    renderChild();
    context.render(keyName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
