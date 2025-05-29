import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

type TooltipHelperProps = {
  description: React.ReactNode;
};

export function TooltipHelper({ description }: TooltipHelperProps) {
  const renderTooltip = (props: any) => (
    <Tooltip {...props}>{description}</Tooltip>
  );

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <i className="mdi mdi-help-circle  ms-1"></i>
    </OverlayTrigger>
  );
}
