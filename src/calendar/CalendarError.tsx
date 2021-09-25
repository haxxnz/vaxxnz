import styles from "./CalendarError.module.scss";
import { useTranslation } from "next-i18next";

/**
 *  @param { string } message Error Message to split
 *  @param { number } split_length Amount of words per line
 *  @returns { string[] } The error message split every {split_length} words
 */
const splitErrorMessage = (message: string, split_length: number): string[] => {
    const _message = message.split(/\s+/g); // split message every " " (each word)
    const lines: string[] = [];

    while (_message.length) {
        const line = _message.splice(0, split_length).join(" "); // remove {split_length} amount from start of array and join it together with " " inbetween words

        lines.push(line);
    }

    return lines;
};

export function CalendarError(props: { errorMessage: string }) {
    const { t } = useTranslation("common");
    return (
        <div className={styles["main-container"]}>
            <div className={styles["center-container"]}>
                <div className={styles["text-container"]}>
                    {splitErrorMessage(props.errorMessage, 5).map((line) => (
                        <p className={styles.title}>{line}</p>
                    ))}
                    <div className={styles.section}>
                        <p className={styles["sub-header"]}>
                            {t("core.mistake")}
                        </p>
                        <a
                            href="https://github.com/CovidEngine/vaxxnz/issues"
                            target="_blank"
                            className={styles.button}
                        >
                            Report error
                        </a>
                    </div>
                </div>
                <img className={styles.map} src="map.svg" alt="" />
            </div>
        </div>
    );
}
