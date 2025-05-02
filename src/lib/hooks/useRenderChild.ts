import { useCallback, useContext } from "react";
import {
  RemaKeyName,
  RemaProviderContext,
} from "../contexts/RemaProviderContext";

export default function useRenderChild(keyName: RemaKeyName) {
  const context = useContext(RemaProviderContext);

  return useCallback(
    function () {
      const keysComponent = Object.keys(context.suscriptions.current).filter(
        (key) => key.includes(`${keyName}-`)
      );
      keysComponent.forEach((key) => context.render(key));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
}
