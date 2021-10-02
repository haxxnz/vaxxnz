import React, { FunctionComponent } from "react";

interface NoticeListItemProps {
  title: string;
}

export const NoticeListItem: FunctionComponent<NoticeListItemProps> = ({
  title,
  children,
}) => (
  <li>
    <h4>{title}</h4>
    <p>{children}</p>
  </li>
);

export const NoticeList: FunctionComponent = ({ children }) => (
  <ul className="NoticeList">{children}</ul>
);
