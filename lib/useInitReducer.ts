/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { RemaKeyName, RemaProviderContext, RemaReducer } from "./contexts";
import useRenderChild from "./useRenderChild";
import useDispatch from "./useDispatch";

export interface UseInitReducerOptions {
  persist?: boolean;
}

export default function useInitReducer<T, A = Record<string, any>>(
  keyName: RemaKeyName,
  reducer: RemaReducer<T, A>,
  initialState: T,
  options: UseInitReducerOptions = {}
) {
  const [, forceRender] = useState({});
  const dispatch = useDispatch<A>(keyName);
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
    context.saveState(keyName, context.getState(keyName) || initialState);
    renderChild();

    return () => {
      if (options?.persist) return;
      context.saveState(keyName, initialState);
      renderChild();
    };
  }, []);

  const values = context.getState(keyName) as T;

  return [values || initialState, dispatch] as const;
}
