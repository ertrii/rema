import { useContext, useEffect } from "react";
import { RemaProviderContext } from "../contexts/RemaProviderContext";

/**
 * Anula la suscripción del estado inicial al desmontar este componente.
 * @param keyName
 */
export default function useUnsubscribe(keyName: string) {
  const context = useContext(RemaProviderContext);

  useEffect(() => {
    return () => {
      context.unsubscribe(keyName);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
