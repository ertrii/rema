/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";
import { RemaComponentMetadata, RemaKeyName, RemaValues } from "./types";

export interface RemaProviderProps {
  saveState: (key: string, value: any) => void;
  states: Record<RemaKeyName, RemaValues>;
  getValues: (keyName: RemaKeyName) => RemaValues["keyName"];
  exists: (keyName: RemaKeyName) => boolean;
  subscribeComponent: (
    keyName: RemaKeyName,
    metadata: RemaComponentMetadata<any>
  ) => void;
  unsubscribeComponent: (keyName: RemaKeyName) => void;
  render: (keyName: RemaKeyName) => void;
}

export const RemaProviderContext = createContext<RemaProviderProps>({
  saveState: () => {},
  states: {},
  getValues: () => ({}),
  exists: () => false,
  subscribeComponent: () => {},
  unsubscribeComponent: () => {},
  render: () => {},
});
