import { useCallback, useContext } from "react";
import {
  RemaKeyName,
  RemaProviderContext,
} from "../contexts/RemaProviderContext";

export default function useRenderChild(keyName: RemaKeyName) {
  const context = useContext(RemaProviderContext);

  return useCallback(
    function () {
      Object.keys(context.suscriptions.current).forEach((key) => {
        if (key.includes(`${keyName}-`)) {
          context.render(key);
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
}
