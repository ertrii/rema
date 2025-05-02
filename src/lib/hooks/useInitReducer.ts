/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useLayoutEffect, useState } from "react";
import { RemaKeyName, RemaProviderContext, RemaReducer } from "../contexts";
import useRenderChild from "./useRenderChild";
import useDispatch from "./useDispatch";

export default function useInitReducer<T, A = Record<string, any>>(
  keyName: RemaKeyName,
  reducer: RemaReducer<T, A>,
  initialState: T
) {
  const [, forceRender] = useState({});
  const dispatch = useDispatch<A>(keyName);
  const context = useContext(RemaProviderContext);
  const renderChild = useRenderChild(keyName);
  if (!context.exists(keyName)) {
    context.saveValues(keyName, initialState);
  }
  useLayoutEffect(() => {
    context.subscribe(keyName, {
      keyName,
      listener: () => forceRender({}),
      reducer,
    });
    return () => context.unsubscribe(keyName);
  }, []);
  useLayoutEffect(() => renderChild(), []);
  const values = context.values.current[keyName] as T;
  return [values || initialState, dispatch] as const;
}
