import { FunctionComponent } from "react";
import styled from "styled-components";
import { PageLink } from "./PageLink";
import { useTranslation } from "react-i18next";

export enum TabType {
  walkIn,
  bookings,
}

interface TabsProps {
  activeTab: TabType;
}

const StyledTabs = styled.div`
  background: white;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  display: flex;
  margin-bottom: 1.5rem;
  border-top: 1px solid lightgray;

  a {
    display: block;
    flex: 1 0 auto;

    &:not(:last-child) {
      border-right: 1px solid lightgray;
    }
  }
  @media screen and (max-width: 400px) {
    flex-direction: column;
  }
`;
export const Tabs: FunctionComponent<TabsProps> = ({ activeTab }) => {
  const { t } = useTranslation("common");
  return (
    <StyledTabs role="tablist">
      <PageLink role="tablist" to="/bookings">
        <Tab isActive={activeTab === TabType.bookings}>
          {t("core.makeABooking")}
        </Tab>
      </PageLink>
      <PageLink role="tablist" to="/locations">
        <Tab isActive={activeTab === TabType.walkIn}>
          {t("core.walkInDriveThru")}
        </Tab>
      </PageLink>
    </StyledTabs>
  );
};

interface TabProps {
  isActive: boolean;
}

const StyledTab = styled.button`
  font-family: inherit;
  appearance: none;
  outline: none;
  border: none;
  border-radius: 0;
  margin: 0;
  cursor: pointer;
  background: none;
  font-size: 1.2rem;
  font-weight: 400;
  text-align: center;
  margin: 0px;
  width: 100%;
  padding: 13px 0px;
  border-bottom: 1px solid lightgray;
  color: #0059be;
  transition: all 0.15s;
  :hover {
    background-color: #e4eeff;
  }

  &[aria-selected="true"] {
    color: #000;
    border-bottom-color: #000;
    background-color: white;
    cursor: default;
    font-weight: 600;
  }
`;

const Tab: FunctionComponent<TabProps> = ({ isActive, children }) => (
  <StyledTab role="tab" aria-selected={isActive}>
    {children}
  </StyledTab>
);
