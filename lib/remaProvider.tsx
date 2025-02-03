/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import { RemaProviderContext } from "./contexts";
import { RemaComponentMetadata, RemaKeyName } from "./types";

export interface RemaProviderProps {
  children: React.ReactNode;
  initialValue: Record<string, Record<string, any>>;
}

export default function RemaProvider({
  children,
  initialValue,
}: RemaProviderProps) {
  const values = useRef(initialValue);
  const subscribes = useRef<Record<string, any>>({});

  function saveState(keyName: RemaKeyName, value: any) {
    values.current[keyName] = value;
  }

  function subscribe(
    keyName: RemaKeyName,
    metadata: RemaComponentMetadata<any>
  ) {
    subscribes.current[keyName] = metadata;
  }

  function unsubscribe(keyName: RemaKeyName) {
    delete subscribes.current[keyName];
  }

  function render(keyName: string) {
    if (!subscribes.current[keyName]) return;
    subscribes.current[keyName].listener();
  }

  return (
    <RemaProviderContext.Provider
      value={{
        saveState,
        states: values.current,
        getValues: (keyName) => values.current[keyName],
        exists: (keyName) => keyName in values.current,
        subscribeComponent: subscribe,
        unsubscribeComponent: unsubscribe,
        render,
      }}
    >
      {children}
    </RemaProviderContext.Provider>
  );
}
