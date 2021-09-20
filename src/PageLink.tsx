import { FunctionComponent } from "react";
import { Link, LinkProps } from "react-router-dom";
import { getSearch } from "./utils/url";

/** A link that retains the users search query (i.e. lat long) */
export const PageLink: FunctionComponent<LinkProps> = ({ to, ...props }) => (
  <Link to={`${to}${getSearch()}`} {...props} />
);
