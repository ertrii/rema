/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { RemaKeyName, RemaProviderContext } from "../contexts";
import useRenderChild from "./useRenderChild";
import useEmit from "./useEmit";

export interface UseInitOptions {
  persist?: boolean;
}

/**
 * Initializes a keyName with an initial value
 * @param keyName
 * @param initialState
 * @param options
 */
export default function useInit<T>(keyName: RemaKeyName, initialState: T) {
  const renderChild = useRenderChild(keyName);
  const [, forceRender] = useState({});
  const emit = useEmit<T>(keyName);
  const context = useContext(RemaProviderContext);
  if (!context.exists(keyName)) {
    context.saveValues(keyName, initialState);
  }
  useLayoutEffect(() => {
    context.subscribe(keyName, {
      keyName,
      listener: () => forceRender({}),
    });
    return () => context.unsubscribe(keyName);
  }, []);

  useEffect(() => renderChild(), []);

  const values = context.values.current[keyName] as T;
  return [values, emit] as const;
}
