import { View } from "components";
import { Badge, Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { FC, useState } from "react";
import useToggle from "hooks/useToggle";
import * as Icon from "react-bootstrap-icons";
import { useSearchParams } from "react-router-dom";
import { TrierOrganisation } from "./TrierOrganisation";
import { FilterOrganisation } from "./FilterOrganisation";

type PersonneToolbarProps = {
  searchParams?: Record<string, any>;
  isFetching: boolean;
  nombreResultat?: number;
};

type SomeFunction = (...args: any[]) => void;
type Timer = ReturnType<typeof setTimeout>;

export function useDebounce<Func extends SomeFunction>(
  func: Func,
  delay = 1000
) {
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

export const OrganisationToolbar: FC<PersonneToolbarProps> = ({
  searchParams,
  isFetching,
  nombreResultat,
}) => {
  const [showFilter, toggleFilter] = useToggle();

  const [, setSearchParams] = useSearchParams();

  const changed = useDebounce(function (e) {
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

  return (
    <>
      <View.Toolbar>
        <div className="w-100">
          <InputGroup>
            <Form.Control
              defaultValue={searchParams?.search || ""}
              placeholder="Rechercher ..."
              onChange={changed}
            />
            <TrierOrganisation />
            <Button variant="secondary" onClick={toggleFilter}>
              <Icon.Filter size="1.3rem" />
              <span className="ms-1 d-none d-sm-inline">Filrer</span>
            </Button>
          </InputGroup>

          <div className="mt-1">
            {Object.entries(searchParams || {}).map(([key, value]) => (
              <Badge key={key} className="me-1" bg="secondary">
                {value?.label}
              </Badge>
            ))}
          </div>
          <div className="fw-light mt-1">
            {Boolean(nombreResultat) && (
              <span className="me-1">{nombreResultat} résultat(s)</span>
            )}
            {isFetching && (
              <Spinner
                className="me-1"
                size="sm"
                animation="grow"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </div>
        </div>
      </View.Toolbar>
      {showFilter && (
        <FilterOrganisation
          applyFiler={(data) => {
            setSearchParams(
              (prevParams) => {
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
                    if (
                      value instanceof Object &&
                      value.hasOwnProperty("value") &&
                      value.hasOwnProperty("label")
                    ) {
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
              },
              { replace: true }
            );

            toggleFilter();
          }}
          defaultValues={searchParams}
          show={showFilter}
          close={toggleFilter}
        />
      )}
    </>
  );
};
