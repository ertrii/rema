export type RemaKeyName = string;
export interface RemaComponentMetadata<T> {
  keyName: RemaKeyName;
  initialState: T;
  listener: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RemaValues<T = any> = Record<RemaKeyName, T>;
