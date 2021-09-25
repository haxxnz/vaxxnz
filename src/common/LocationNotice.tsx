import { FunctionComponent } from "react";
import { Trans, useTranslation } from "next-i18next";
import { Instruction } from "../today-locations/healthpoint/HealthpointData";

interface LocationNoticeProps {
    instructions: Instruction[];
}

export const LocationNotice: FunctionComponent<LocationNoticeProps> = ({
    instructions,
}) => {
    const { t } = useTranslation("common");
    return (
        <>
            {instructions.includes(Instruction.walkIn) && (
                <div>
                    <br />
                    <p>{t("walkins.noticeList.text")}</p>
                    <br />
                    <p>
                        <Trans
                            i18nKey="walkins.cancellationNotice.message"
                            t={t}
                            components={[
                                <a
                                    href="https://bookmyvaccine.nz"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    https://bookmyvaccine.nz
                                </a>,
                            ]}
                        />
                    </p>
                </div>
            )}

            {instructions.includes(Instruction.driveThrough) && (
                <div>
                    <br />
                    <p>{t("walkins.noticeList.text")}</p>
                    <br />
                    <p>
                        <Trans
                            i18nKey="walkins.cancellationNotice.message"
                            t={t}
                            components={[
                                <a
                                    href="https://bookmyvaccine.nz"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    https://bookmyvaccine.nz
                                </a>,
                            ]}
                        />
                    </p>
                </div>
            )}
        </>
    );
};
