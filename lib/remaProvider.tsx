/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import {
  RemaComponentMetadata,
  RemaKeyName,
  RemaProviderContext,
} from "./contexts";

export interface RemaProviderProps {
  children: React.ReactNode;
}

export default function RemaProvider({ children }: RemaProviderProps) {
  const values = useRef<Record<RemaKeyName, Record<string, any>>>({});
  const subscribes = useRef<Record<string, any>>({});

  function saveState(keyName: RemaKeyName, value: any) {
    values.current[keyName] = value;
  }

  function exists(keyName: RemaKeyName) {
    return keyName in values.current;
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

  function getOptions(keyName: RemaKeyName) {
    if (!exists(keyName)) return null;
    return subscribes.current[keyName].options;
  }

  function getSubscribe<R>(keyName: RemaKeyName) {
    return (subscribes.current[keyName] as RemaComponentMetadata<R>) || null;
  }

  return (
    <RemaProviderContext.Provider
      value={{
        saveState,
        getState: (keyName) => values.current[keyName],
        values: values.current,
        exists,
        subscribeComponent: subscribe,
        unsubscribeComponent: unsubscribe,
        subscribes: subscribes.current,
        getSubscribe,
        getOptions,
        render,
      }}
    >
      {children}
    </RemaProviderContext.Provider>
  );
}
