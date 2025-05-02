/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useId, useLayoutEffect, useState } from "react";
import {
  RemaProviderContext,
  RemaProviderProps,
} from "../contexts/RemaProviderContext";

/**
 * Listens to a keyName and returns the current state
 * @param keyName
 * @param fallback
 */
export default function useListen<T>(keyName: string, fallback?: T) {
  const [, forceRender] = useState({});
  const id = useId();
  const context = useContext<RemaProviderProps<T>>(RemaProviderContext);

  useLayoutEffect(() => {
    context.subscribe(`${keyName}-${id}`, {
      keyName,
      listener: () => forceRender({}),
    });
    return () => {
      context.unsubscribe(`${keyName}-${id}`);
    };
  }, []);

  const values = context.values.current[keyName];
  if (!values) {
    if (fallback) return fallback;
    return {} as T;
  }
  return values as T;
}
