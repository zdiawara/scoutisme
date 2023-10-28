import { useMemo, useState } from "react";
import { CrudAction } from "types/form.type";

export function useCrudModal<T>() {
  const [action, setAction] = useState<CrudAction<T> | undefined>();

  const isCreateOrUpdate = useMemo(
    () => !!action && ["c", "u"].includes(action.code),
    [action]
  );
  const isDelete = useMemo(
    () => !!action && ["d"].includes(action.code),
    [action]
  );

  const onCreate = () => () => {
    setAction({ code: "c" });
  };

  const onUpdate = (element: T) => () => {
    setAction({ code: "u", element });
  };

  const onDelete = (element: T) => () => {
    setAction({ code: "d", element });
  };

  const reset = () => {
    setAction(undefined);
  };

  return {
    action,
    setAction,
    isDelete,
    isCreateOrUpdate,
    onCreate,
    onUpdate,
    onDelete,
    reset,
  };
}
