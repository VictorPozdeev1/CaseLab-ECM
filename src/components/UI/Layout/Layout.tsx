import { FC } from "react";
import { Outlet } from "react-router-dom";

interface LayoutProps {
  header?: JSX.Element;
  // main?: JSX.Element;
  footer?: JSX.Element;
  sidebar?: JSX.Element;
}

export const Layout: FC<LayoutProps> = ({ header, footer, sidebar }) => {
  return (
    <div className="layout-wrapper">
      {/* {header}
      {sidebar} */}
      <Outlet />
      {/* {footer} */}
    </div>
  );
};
