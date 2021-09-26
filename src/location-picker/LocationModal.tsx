import { Button, KIND } from "baseui/button";
import { BaseInput } from "baseui/input";
import { Modal } from "baseui/modal";
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { enqueueAnalyticsEvent } from "../utils/analytics";
import getSuburb from "../utils/reverseGeocode";
import { ADDRESS_FINDER_API_KEY } from "../utils/consts";
import Script from "next/script";
import { useRouter } from "next/router";

type Props = {
    locationIsOpen: boolean;
    setLocationIsOpen: (isOpen: boolean) => void;
};

const LocationModal = (props: Props) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [loaded, setLoaded] = useState(() => {
        try {
            return Boolean(AddressFinder);
        } catch {
            return false;
        }
    });
    const { setLocationIsOpen } = props;

    const { t } = useTranslation("common");

    const close = useCallback(() => {
        setLocationIsOpen(false);
    }, [setLocationIsOpen]);

    const getMetaDataLocation = (metaData: MetaData) => {
        const { city, region, suburb } = metaData;

        if (suburb == null && city == null) {
            return region;
        } else if (suburb == null) {
            return city;
        } else {
            return suburb;
        }
    };

    const setLocation = useCallback(
        (lat: number, lng: number, name?: string | null) => {
            const placeName = name ?? `${lat} ${lng}`;
            close();
            router.push(
                {
                    pathname: router.pathname,
                    query: {
                        lat: lat.toString(),
                        lng: lng.toString(),
                        placeName: placeName,
                    },
                },
                {
                    query: {
                        lat: lat.toString(),
                        lng: lng.toString(),
                        placeName: placeName,
                    },
                },
                { shallow: true }
            );
            enqueueAnalyticsEvent("Location set");
        },
        [close]
    );
    const inputRef = useCallback(
        (domNode) => {
            if (domNode != null) {
                domNode.focus();
                const widget = new AddressFinder.Widget(
                    domNode,
                    ADDRESS_FINDER_API_KEY,
                    "NZ",
                    {
                        address_params: {
                            post_box: "0",
                            max: "7",
                        },
                        show_locations: true,
                        location_params: {
                            max: "4",
                            region: 0,
                        },
                    }
                );

                widget.on("result:select", function (fullAddress, metaData) {
                    const locationName = getMetaDataLocation(metaData);

                    setLocation(
                        parseFloat(metaData.y),
                        parseFloat(metaData.x),
                        locationName
                    );
                });
            }
        },
        [setLocation]
    );

    const getLocation = () => {
        if (!navigator.geolocation) {
            alert(t("navigation.locationModal.geolocationNotSupported"));
            return;
        }

        setLoading(true);
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;

            try {
                const suburb = await getSuburb(latitude, longitude);
                setLocation(latitude, longitude, suburb);
            } catch (err) {
                console.log("Could not reverse geocode to a suburb.", err);
                setLocation(latitude, longitude);
            } finally {
                setLoading(false);
            }
        });
    };

    return (
        <Modal
            onClose={close}
            isOpen={!!props.locationIsOpen}
            unstable_ModalBackdropScroll={true}
            overrides={{
                Root: { style: { zIndex: 1500 } },
                Dialog: {
                    style: {
                        height: "auto",
                        width: "600px",
                        display: "flex",
                        flexDirection: "column",
                        padding: "1.5rem",
                    },
                },
            }}
        >
            <Script
                id={"address-finder" /* required */}
                src={"https://api.addressfinder.io/assets/v3/widget.js"}
                onLoad={() => setLoaded(true)}
            />
            <h2>{t("navigation.locationModal.locaitonTitle")}</h2>
            <p
                style={{
                    marginTop: "1rem",
                    marginBottom: "0.5rem",
                    marginRight: "1rem",
                }}
            >
                {t("navigation.locationModal.locationCTA")}
            </p>
            {loaded && (
                <BaseInput
                    id="pac-input"
                    type="text"
                    inputRef={(e) => inputRef(e)}
                    onChange={(_e) => {}}
                />
            )}
            <button
                className={"clickable"}
                style={{
                    color: "#0057FF",
                    fontWeight: 600,
                    marginBlock: 20,
                    textAlign: "left",
                    border: "none",
                    backgroundColor: "white'",
                }}
                onClick={() => {
                    enqueueAnalyticsEvent("Use current location clicked");
                    getLocation();
                }}
            >
                {loading
                    ? t("core.loading")
                    : t("navigation.locationModal.useCurrentLocation")}
            </button>
            <Button
                overrides={{
                    Root: {
                        style: {
                            width: "100%",
                            marginTop: "0.5rem",
                            marginRight: 0,
                            marginBottom: "0.5rem",
                            marginLeft: 0,
                        },
                    },
                }}
                kind={KIND.secondary}
                onClick={close}
            >
                {t("core.cancel")}
            </Button>
        </Modal>
    );
};

export default LocationModal;
