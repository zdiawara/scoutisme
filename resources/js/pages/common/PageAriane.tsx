import { FC } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

type PageFilterProps = {
  items: Array<{
    link?: string;
    label: string;
    active?: boolean;
  }>;
};

export const PageAriane: FC<PageFilterProps> = ({ items }) => {
  return (
    <Breadcrumb className="mb-0 ariane fw-semibold fs-5">
      <Breadcrumb.Item href="#">Acceuil</Breadcrumb.Item>
      <Breadcrumb.Item href={"/scouts"} linkAs={Link}>
        Test
      </Breadcrumb.Item>
      {/* {items.map((item, i) => (
        <Breadcrumb.Item
          key={i}
          href={"/scouts"}
          active={item.active}
          linkAs={Link}
        >
          {item.label}
        </Breadcrumb.Item>
      ))} */}
    </Breadcrumb>
  );
};
