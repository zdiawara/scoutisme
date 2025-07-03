import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

type SomeFunction = (...args: any[]) => void;
type Timer = ReturnType<typeof setTimeout>;

export function useDebounce<Func extends SomeFunction>(func: Func, delay = 1000) {
  const [timer, setTimer] = useState<Timer>();

  const debouncedFunction = ((...args) => {
    const newTimer = setTimeout(() => {
      func(...args);
    }, delay);

    timer && clearTimeout(timer);
    setTimer(newTimer);
  }) as Func;

  return debouncedFunction;
}

export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = useMemo(() => {
    return Object.fromEntries(searchParams.entries());
  }, [searchParams]);

  const setPageNumber = (pageNumber: number) => {
    setSearchParams(
      (prevParams) => {
        const params = new URLSearchParams(prevParams);
        params.set("page", (pageNumber + 1).toString());
        return params;
      },
      { replace: true }
    );

    window.scroll({ top: 0 });
  };

  const build = (data: any, prevParams: any) => {
    const params = new URLSearchParams(prevParams);
    if (!data) {
      Array.from(params.keys()).forEach((key) => {
        if (key !== "search") {
          params.delete(key);
        }
      });
      return params;
    }

    Object.entries(data).forEach(([key]) => {
      if (key !== "search") {
        params.delete(key);
      }
    });

    Object.entries(data)
      .filter(([, value]) => Boolean(value))
      .forEach(([key, value]) => {
        let val: any = value;
        if (value instanceof Object && value.hasOwnProperty("value") && value.hasOwnProperty("label")) {
          const _val = value as Record<string, any>;
          val = JSON.stringify({
            value: _val.value,
            label: _val.label,
          });
        } else {
          val = value;
        }
        params.set(key, val);
      });

    params.set("page", "1");

    return params;
  };

  const onChangeFilter = (data: any) => {
    setSearchParams((prevParams) => build(data, prevParams), { replace: true });
  };

  const onSearch = useDebounce(function (e) {
    const { value } = e.target;
    setSearchParams(
      (prevParams) => {
        const params = new URLSearchParams(prevParams);
        if (value) {
          params.set("search", value);
        } else {
          params.delete("search");
        }
        params.set("page", "1");
        return params;
      },
      { replace: true }
    );
  }, 500);

  const setSort = (sort: string) => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        params.set("sort", sort);
        return params;
      },
      { replace: true }
    );
  };
  return {
    queryParams,
    searchParams,
    setPageNumber,
    onSearch,
    onChangeFilter,
    setSort,
  };
};
