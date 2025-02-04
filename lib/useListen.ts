/* eslint-disable react-hooks/exhaustive-deps */
import { Context, useContext, useEffect, useId, useState } from "react";
import { RemaProviderContext, RemaProviderProps } from "./contexts";

/**
 * Listens to a keyName and returns the current state
 * @param keyName
 * @param fallback
 */
export default function useListen<T>(keyName: string, fallback?: T) {
  const [, forceRender] = useState({});
  const id = useId();
  const context = useContext(
    RemaProviderContext as Context<RemaProviderProps<T>>
  );

  useEffect(() => {
    context.subscribeComponent(`${keyName}-${id}`, {
      initialState: fallback,
      keyName,
      listener: () => forceRender({}),
      options: { persist: false },
    });
    return () => {
      context.unsubscribeComponent(`${keyName}-${id}`);
    };
  }, []);

  const states = context.getState(keyName);
  if (!states) {
    if (fallback) return fallback;
    return {} as T;
  }

  return states;
}
