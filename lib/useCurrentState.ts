import { useContext } from "react";
import { RemaKeyName, RemaProviderContext } from "./contexts";

/**
 * Returns the current state of the keyName
 * @param keyName
 */
export default function useCurrentState<T>(keyName: RemaKeyName) {
  const context = useContext(RemaProviderContext);
  const values = context.getState(keyName) as T;
  return values;
}
