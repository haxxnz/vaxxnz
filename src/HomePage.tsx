import { FunctionComponent } from "react";
import { PageLink } from "./PageLink";
import { useTranslation } from "react-i18next";

export enum TabType {
  walkIn,
  bookings,
}

interface TabsProps {
  activeTab: TabType;
}

export const Tabs: FunctionComponent<TabsProps> = ({ activeTab }) => {
  const { t } = useTranslation("common");
  return (
    <div className="styled-tabs" role="tablist">
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
    </div>
  );
};

interface TabProps {
  isActive: boolean;
}

const Tab: FunctionComponent<TabProps> = ({ isActive, children }) => (
  <button className="styled-tab" role="tab" aria-selected={isActive}>
    {children}
  </button>
);
