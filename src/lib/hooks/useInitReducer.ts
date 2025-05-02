/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  RemaKeyName,
  RemaProviderContext,
  RemaReducer,
} from "../contexts/RemaProviderContext";
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
    if (context.hasReservation(keyName)) {
      context.saveValues(keyName, context.reservations.current[keyName]);
      context.deleteReservation(keyName);
      forceRender({});
    }
  }, []);
  useEffect(() => {
    context.subscribe(keyName, {
      keyName,
      listener: () => forceRender({}),
      reducer,
    });
    renderChild();
  }, []);
  const values = context.values.current[keyName] as T;
  return [values || initialState, dispatch] as const;
}
