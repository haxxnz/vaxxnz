import React, { FunctionComponent } from "react";
import { Switch, Route } from "react-router";
import styled from "styled-components";
import {
  CalendarSection,
  CalendarSectionProps,
} from "./calendar/CalendarSection";
import { PageLink } from "./PageLink";
import { TodayLocationsSection } from "./today-locations/TodayLocationsSection";

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

const Tabs: FunctionComponent<TabsProps> = ({ activeTab }) => (
  <StyledTabs>
    <PageLink to="/bookings" role="tablist" title="make a booking">
      <Tab isActive={activeTab === TabType.bookings}>Make a Booking</Tab>
    </PageLink>
    <PageLink to="/locations" role="tablist" title="walk-in locations">
      <Tab isActive={activeTab === TabType.walkIn}>Walk-in/Drive Thru</Tab>
    </PageLink>
  </StyledTabs>
);

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
