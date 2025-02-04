/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { RemaKeyName, RemaProviderContext, RemaReducer } from "./contexts";
import useEmit from "./useEmit";
import useRenderChild from "./useRenderChild";

export interface UseInitReducerOptions {
  persist?: boolean;
}

export default function useInitReducer<T>(
  keyName: RemaKeyName,
  reducer: RemaReducer<T>,
  initialState: T,
  options: UseInitReducerOptions = {}
) {
  const [, forceRender] = useState({});
  const emit = useEmit<T>(keyName);
  const context = useContext(RemaProviderContext);
  const renderChild = useRenderChild(keyName);

  /**
   * Subscribe component to the context
   */
  useEffect(() => {
    context.subscribeComponent(keyName, {
      keyName,
      initialState,
      listener: () => forceRender({}),
      reducer,
      options: {
        persist: options.persist || false,
      },
    });
    return () => context.unsubscribeComponent(keyName);
  }, []);

  /**
   * Initialize the state
   */
  useEffect(() => {
    const nextStates = options.persist
      ? context.getState(keyName)
      : initialState;
    context.saveState(keyName, nextStates);
    renderChild();
  }, []);

  const values = context.getState(keyName) as T;

  return [values || initialState, emit] as const;
}
