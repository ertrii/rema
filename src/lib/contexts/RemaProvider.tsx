/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import {
  RemaComponentMetadata,
  RemaKeyName,
  RemaProviderContext,
} from "./RemaProviderContext";

export interface RemaProviderProps {
  children: React.ReactNode;
}

export default function RemaProvider({ children }: RemaProviderProps) {
  const values = useRef<Record<RemaKeyName, Record<string, any>>>({});
  const reservations = useRef<Record<RemaKeyName, Record<string, any>>>({});
  const suscriptions = useRef<Record<string, any>>({});

  function saveValues(keyName: RemaKeyName, value: any) {
    values.current[keyName] = value;
  }

  function exists(keyName: RemaKeyName) {
    return keyName in suscriptions.current;
  }

  function subscribe(
    keyName: RemaKeyName,
    metadata: RemaComponentMetadata<any>
  ) {
    suscriptions.current[keyName] = metadata;
  }

  function unsubscribe(keyName: RemaKeyName) {
    delete suscriptions.current[keyName];
  }

  function render(keyName: string) {
    if (!suscriptions.current[keyName]) return;
    suscriptions.current[keyName].listener();
  }

  function hasReservation(keyName: string) {
    return keyName in reservations.current;
  }
  function deleteReservation(keyName: string) {
    if (hasReservation(keyName)) {
      delete reservations.current[keyName];
      return true;
    }
    return false;
  }

  return (
    <RemaProviderContext.Provider
      value={{
        saveValues,
        values,
        exists,
        subscribe,
        unsubscribe,
        suscriptions,
        render,
        reservations,
        hasReservation,
        deleteReservation,
      }}
    >
      {children}
    </RemaProviderContext.Provider>
  );
}
