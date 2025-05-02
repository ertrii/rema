import { useCallback, useContext } from "react";
import { RemaProviderContext } from "../contexts/RemaProviderContext";

export default function useReserve<T>(keyName: string) {
  const context = useContext(RemaProviderContext);
  return useCallback(function (initialState: T) {
    if (context.exists(keyName)) return false;
    context.reservations.current[keyName] = initialState as Record<
      string,
      unknown
    >;
    return true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
