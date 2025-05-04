import { useContext } from "react";
import {
  RemaKeyName,
  RemaProviderContext,
} from "../contexts/RemaProviderContext";

/**
 * Returns the current state of the keyName
 * @param keyName
 * @param fallback
 */
export default function useValues<T>(keyName: RemaKeyName, fallback?: T) {
  const context = useContext(RemaProviderContext);
  const values = context.values.current[keyName] as T;
  return values || (fallback as T);
}
