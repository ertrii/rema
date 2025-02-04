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
 * @param initialState
 * @param options
 */
export default function useInit<T>(
  keyName: RemaKeyName,
  initialState: T,
  options: UseInitOptions = {}
) {
  const [, forceRender] = useState({});
  const emit = useEmit<T>(keyName);
  const context = useContext(RemaProviderContext);
  const renderChild = useRenderChild(keyName);

  useEffect(() => {
    context.subscribeComponent(keyName, {
      keyName,
      initialState: initialState,
      listener: () => forceRender({}),
      options: {
        persist: options.persist || false,
      },
    });
    return () => context.unsubscribeComponent(keyName);
  }, []);

  useEffect(() => {
    context.saveState(keyName, context.getState(keyName) || initialState);
    renderChild();

    return () => {
      if (options?.persist) return;
      context.saveState(keyName, initialState);
      renderChild();
    };
  }, []);

  const values = context.getState(keyName) as T;

  return [values || initialState, emit] as const;
}
