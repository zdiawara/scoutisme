import { FC } from "react";
import { NumericFormat } from "react-number-format";
import { DEVISE } from "utils/constants";

type MontantFormatTextProps = {
  value?: string | number;
  withDevise?: boolean;
};
export const MontantFormatText: FC<MontantFormatTextProps> = ({
  value,
  withDevise,
}) => {
  if (value === undefined || value === null) {
    return null;
  }
  return (
    <>
      <NumericFormat
        value={value}
        thousandSeparator=" "
        //isNumericString
        decimalSeparator=","
        displayType="text"
      />
      &nbsp;
      {DEVISE}
    </>
  );
};
