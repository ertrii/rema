import { useCallback, useContext } from "react";
import { RemaKeyName, RemaProviderContext } from "../contexts";
import useRenderChild from "./useRenderChild";

export default function useDispatch<A>(
  keyName: RemaKeyName,
  onlyRenderThis = false
) {
  const context = useContext(RemaProviderContext);
  const renderChild = useRenderChild(keyName);
  return useCallback(function dispatch(action: A) {
    const metadata = context.suscriptions.current[keyName];
    const values = context.values.current[keyName];
    if (metadata?.reducer && values) {
      context.saveValues(keyName, metadata.reducer(values, action));
      context.render(keyName);
      if (onlyRenderThis) return;
      renderChild();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
