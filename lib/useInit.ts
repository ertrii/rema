/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { RemaKeyName, RemaProviderContext } from "./contexts";
import useRenderChild from "./useRenderChild";

export interface UseInitOptions {
  persist?: boolean;
}

export default function useInit<T>(
  keyName: RemaKeyName,
  initialValue: T,
  options: UseInitOptions = {}
) {
  const [, forceRender] = useState({});
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

  return values || initialValue;
}
