import { FC } from "react";
import { Button, ButtonProps, Spinner } from "react-bootstrap";

type SubmitButtonProps = {
  isLoading?: boolean;
};

export const SubmitButton: FC<ButtonProps & SubmitButtonProps> = ({
  children,
  isLoading,
  ...props
}) => {
  return (
    <Button {...props} disabled={isLoading} type="submit">
      {isLoading && (
        <Spinner size="sm" className="me-2" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {children}
    </Button>
  );
};
