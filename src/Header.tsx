import { useTranslation } from "next-i18next";
import LanguageSelect from "./LanguageSelect";

export function Header() {
    const { t } = useTranslation("common");
    return (
        <header className="menu-header">
            <a href="/" className="nolink menu-logo">
                {t("core.title")}
            </a>
            <div className="menu-divider">
                {" "}
                <a
                    href="https://github.com/CovidEngine/vaxxnz"
                    target="_blank"
                    rel="noreferrer"
                    className="menu-link"
                >
                    {t("navigation.about")}
                </a>
                <a
                    href="https://airtable.com/shrxuw3vSp2yRPrG7"
                    className="menu-link"
                >
                    {t("navigation.contact")}
                </a>
                <LanguageSelect />
            </div>
        </header>
    );
}
