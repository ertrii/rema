/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { RemaKeyName, RemaProviderContext } from "./contexts";
import useRenderChild from "./useRenderChild";
import useEmit from "./useEmit";

export interface UseInitOptions {
  persist?: boolean;
}

/**
 * Initializes a keyName with an initial value
 * @param keyName
 * @param initialValue
 * @param options
 */
export default function useInit<T>(
  keyName: RemaKeyName,
  initialValue: T,
  options: UseInitOptions = {}
) {
  const [, forceRender] = useState({});
  const emit = useEmit<T>(keyName);
  const context = useContext(RemaProviderContext);
  const renderChild = useRenderChild(keyName);

  useEffect(() => {
    context.subscribeComponent(keyName, {
      keyName,
      initialState: initialValue,
      listener: () => forceRender({}),
      options: {
        persist: options.persist || false,
      },
    });
    return () => context.unsubscribeComponent(keyName);
  }, []);

  useEffect(() => {
    const nextStates = options.persist
      ? context.getState(keyName)
      : initialValue;
    context.saveState(keyName, nextStates || initialValue);
    renderChild();
  }, []);

  const values = context.getState(keyName) as T;

  return [values || initialValue, emit] as const;
}
