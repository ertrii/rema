/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { RemaProviderContext } from "./contexts";

export interface UseInitOptions {
  persist?: boolean;
}

export default function useInit<T>(
  keyName: string,
  initialValue: T,
  options: UseInitOptions = {}
) {
  const [, forceRender] = useState({});
  const context = useContext(RemaProviderContext);

  useEffect(() => {
    if (options.persist && context.exists(keyName)) return;
    context.saveState(keyName, initialValue);
  }, []);

  useEffect(() => {
    context.subscribeComponent(keyName, {
      keyName,
      initialState: initialValue,
      listener: () => forceRender({}),
    });
    return () => context.unsubscribeComponent(keyName);
  }, []);

  const values = context.getValues(keyName) as T;

  return values || initialValue;
}
