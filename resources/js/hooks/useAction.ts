import { useState } from "react";

export function useModalAction() {
  const [action, setAction] = useState<string | undefined>();

  const close = () => {
    setAction(undefined);
  };

  const change = (code: string) => () => {
    setAction(code);
  };

  return {
    action,
    close,
    change,
  };
}
