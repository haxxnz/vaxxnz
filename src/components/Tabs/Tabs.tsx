import * as React from "react";
import { FunctionComponent } from "react";
import { PageLink } from "../../PageLink";
import { useTranslation } from "next-i18next";
import styles from "./Tabs.module.scss";

export enum TabType {
    walkIn,
    bookings,
}
interface TabsProps {
    activeTab: TabType;
}

interface TabProps {
    isActive: boolean;
}

const Tab: FunctionComponent<TabProps> = ({ isActive, children }) => (
    <button aria-selected={isActive} role="tab" className={styles.tab}>
        {children}
    </button>
);

export const Tabs = ({ activeTab }: TabsProps) => {
    const { t } = useTranslation("common");
    return (
        <div role="tablist" className={styles.base}>
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
