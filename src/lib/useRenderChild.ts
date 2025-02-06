import { useContext } from "react";
import { RemaKeyName, RemaProviderContext } from "./contexts";

export default function useRenderChild(keyName: RemaKeyName) {
  const context = useContext(RemaProviderContext);

  return function render() {
    const keysComponent = Object.keys(context.subscribes).filter((key) =>
      key.includes(`${keyName}-`)
    );
    keysComponent.forEach((key) => context.render(key));
  };
}
