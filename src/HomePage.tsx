import React, { FunctionComponent } from "react";
import { Switch, Route } from "react-router";
import styled from "styled-components";
import {
  CalendarSection,
  CalendarSectionProps,
} from "./calendar/CalendarSection";
import { PageLink } from "./PageLink";
import { TodayLocationsSection } from "./today-locations/TodayLocationsSection";
import { useTranslation } from "react-i18next";

interface HomePageProps extends CalendarSectionProps {}

enum TabType {
  walkIn,
  bookings,
}

export const HomePage: FunctionComponent<HomePageProps> = ({ bookingData }) => {
  return (
    <Switch>
      <Route path="/locations">
        <Tabs activeTab={TabType.walkIn} />
        <TodayLocationsSection />
      </Route>
      <Route>
        <Tabs activeTab={TabType.bookings} />
        <CalendarSection bookingData={bookingData} />
      </Route>
    </Switch>
  );
};

interface TabsProps {
  activeTab: TabType;
}

const StyledTabs = styled.div`
  background: white;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  display: flex;
  margin-bottom: 1.5rem;

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

const Tabs: FunctionComponent<TabsProps> = ({ activeTab }) => {
  const { t } = useTranslation("common");
  return (
  <StyledTabs role="tablist">
    <PageLink to="/bookings">
      <Tab isActive={activeTab === TabType.bookings}>{t("core.makeABooking")}</Tab>
    </PageLink>
    <PageLink to="/locations">
      <Tab isActive={activeTab === TabType.walkIn}>{t("core.walkInDriveThru")}</Tab>
    </PageLink>
  </StyledTabs>
  )
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
  color: #0076ff;
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
  <StyledTab aria-selected={isActive} role="tab">
    {children}
  </StyledTab>
);
