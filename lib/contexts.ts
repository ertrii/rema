/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";

export type RemaKeyName = string;
export interface RemaComponentMetadata<T> {
  keyName: RemaKeyName;
  initialState: T;
  reducer?: RemaReducer<T>;
  listener: () => void;
  options: {
    persist: boolean;
  };
}

export type RemaValues<T = any> = Record<RemaKeyName, T>;
export type RemaAction<T extends string, P = any> = { type: T; payload?: P };
export type RemaReducer<S = any, A = null> = (state: S, action: A) => S;

export interface RemaProviderProps<T = any> {
  saveState: (key: string, value: T) => void;
  values: Record<RemaKeyName, RemaValues<T>>;
  getState: (keyName: RemaKeyName) => RemaValues<T>["keyName"];
  exists: (keyName: RemaKeyName) => boolean;
  subscribeComponent: (
    keyName: RemaKeyName,
    metadata: RemaComponentMetadata<any>
  ) => void;
  unsubscribeComponent: (keyName: RemaKeyName) => void;
  subscribes: Record<RemaKeyName, RemaComponentMetadata<any>>;
  getOptions: (
    keyName: RemaKeyName
  ) => RemaComponentMetadata<T>["options"] | null;
  getSubscribe: <R>(keyName: RemaKeyName) => RemaComponentMetadata<R> | null;
  render: (keyName: RemaKeyName) => void;
}

export const RemaProviderContext = createContext<RemaProviderProps>({
  saveState: () => {},
  values: {},
  getState: () => ({}),
  exists: () => false,
  subscribeComponent: () => {},
  unsubscribeComponent: () => {},
  subscribes: {},
  getOptions: () => null,
  getSubscribe: () => null,
  render: () => {},
});
