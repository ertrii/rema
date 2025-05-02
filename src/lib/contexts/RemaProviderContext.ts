/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, MutableRefObject } from "react";

export type RemaKeyName = string;
export interface RemaComponentMetadata<T> {
  keyName: RemaKeyName;
  reducer?: RemaReducer<T>;
  listener: () => void;
}

export type RemaValues<T = any> = Record<RemaKeyName, T>;
export type RemaAction<T extends string, P = any> = { type: T; payload?: P };
export type RemaReducer<S = any, A = any> = (state: S, action: A) => S;

export interface RemaProviderProps<T = any> {
  saveValues: (key: string, value: T) => void;
  values: MutableRefObject<Record<RemaKeyName, RemaValues<T>>>;
  reservations: MutableRefObject<Record<RemaKeyName, RemaValues<T>>>;
  exists: (keyName: RemaKeyName) => boolean;
  hasReservation: (keyName: RemaKeyName) => boolean;
  deleteReservation: (keyName: RemaKeyName) => boolean;
  subscribe: (
    keyName: RemaKeyName,
    metadata: RemaComponentMetadata<any>
  ) => void;
  unsubscribe: (keyName: RemaKeyName) => void;
  suscriptions: MutableRefObject<
    Record<RemaKeyName, RemaComponentMetadata<any>>
  >;
  render: (keyName: RemaKeyName) => void;
}

export const RemaProviderContext = createContext<RemaProviderProps>({
  saveValues: () => {},
  values: { current: {} },
  exists: () => false,
  reservations: { current: {} },
  hasReservation: () => false,
  deleteReservation: () => false,
  subscribe: () => {},
  unsubscribe: () => {},
  suscriptions: { current: {} },
  render: () => {},
});
