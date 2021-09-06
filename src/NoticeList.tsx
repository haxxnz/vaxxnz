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
  <ul className="NoticeList">
    {/* <NoticeListItem title="Follow Alert Level Restrictions">
      Masks are mandatory at Alert Level 3 and 4. Remember to scan in with the
      NZ COVID Tracer app, observe social distancing and be kind.
      <br />
      <i style={{ fontSize: "0.85em", marginTop: "" }}>
        For more information visit{" "}
        <a href="https://covid19.govt.nz/covid-19-vaccines/how-to-get-a-covid-19-vaccination/what-to-expect-when-you-get-your-vaccinations/">
          covid19.govt.nz
        </a>
      </i>
    </NoticeListItem> */}

    {children}
  </ul>
);
