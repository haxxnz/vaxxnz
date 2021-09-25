import { FunctionComponent } from "react";
import { PageLink } from "./PageLink";
import { useTranslation } from "next-i18next";

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
        <div role="tablist">
            <PageLink role="tablist" to="/">
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

const Tab: FunctionComponent<TabProps> = ({ isActive, children }) => <>"Tab"</>;
