import { Button, KIND } from "baseui/button";
import { BaseInput } from "baseui/input";
import { Modal } from "baseui/modal";
import { useCallback, useMemo, useState } from "react";
import "./App.css";

type Props = {
    locationIsOpen: boolean;
    setLocationIsOpen: (isOpen: boolean) => void;
    setLat: (lat: number) => void;
    setLng: (lng: number) => void;
    setPlaceName: (name: string) => void;
};

function getSuburbIsh(
    place: google.maps.places.PlaceResult
): string | undefined {
    const { address_components } = place;
    const suburbish = (address_components ?? []).find(
        (a) =>
            a.types.includes("locality") ||
            a.types.includes("sublocality_level_1") ||
            a.types.includes("sublocality")
    );
    const short_name = suburbish?.short_name;
    return short_name;
}

const LocationModal = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { setLat, setLng, setPlaceName, setLocationIsOpen } = props;
    const [, setAddress] = useState("");
    const geocoder = useMemo(() => new google.maps.Geocoder(), []);
    const placesService = useMemo(
        () =>
            new google.maps.places.PlacesService(document.createElement("div")),
        []
    );

    const close = useCallback(() => {
        setLocationIsOpen(false);
    }, [setLocationIsOpen]);

    const setLocation = useCallback(
        (lat: number, lng: number, name: string) => {
            setLat(lat);
            setLng(lng);
            setPlaceName(name);
            close();
            const url = new URL(window.location.toString());
            url.searchParams.set("lat", lat.toString());
            url.searchParams.set("lng", lng.toString());
            url.searchParams.set("placeName", name);
            window.history.pushState({}, "", url.toString());
        },
        [close, setLat, setLng, setPlaceName]
    );
    const inputRef = useCallback(
        (domNode) => {
            if (domNode != null) {
                const options = {
                    componentRestrictions: { country: "nz" },
                    fields: ["geometry", "name", "address_components"],
                    strictBounds: false,
                };

                const autocomplete = new google.maps.places.Autocomplete(
                    domNode,
                    options
                );

                autocomplete.addListener("place_changed", () => {
                    const place = autocomplete.getPlace();

                    if (
                        place.name &&
                        place.geometry != null &&
                        place.geometry.location != null
                    ) {
                        const suburbish = getSuburbIsh(place);
                        const { lat, lng } = place.geometry.location;

                        if (suburbish) {
                            setLocation(lat(), lng(), suburbish);
                        } else {
                            setLocation(lat(), lng(), `${lat()}, ${lng()}`);
                        }
                    }
                });
                return () => {
                    google.maps.event.clearListeners(
                        autocomplete,
                        "place_changed"
                    );
                };
            }
        },
        [setLocation]
    );

    const getLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
        } else {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                const response = await geocoder.geocode({
                    location: {
                        lat: latitude,
                        lng: longitude,
                    },
                });
                const { results } = response;
                if (results.length > 0) {
                    placesService.getDetails(
                        {
                            placeId: results[0].place_id,
                            fields: ["geometry", "name", "address_components"],
                        },
                        (place, status: string) => {
                            if (status === "OK" && place) {
                                const suburbish = getSuburbIsh(place);
                                setLocation(
                                    latitude,
                                    longitude,
                                    suburbish ?? `${latitude}, ${longitude}`
                                );
                                setLoading(false);
                            } else {
                                setLocation(
                                    latitude,
                                    longitude,
                                    `${latitude}, ${longitude}`
                                );
                                setLoading(false);
                            }
                        }
                    );
                } else {
                    setLocation(
                        latitude,
                        longitude,
                        `${latitude}, ${longitude}`
                    );
                    setLoading(false);
                }
            });
        }
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
            <h2>Location</h2>
            <p
                style={{
                    marginTop: "1rem",
                    marginBottom: "0.5rem",
                    marginRight: "1rem",
                }}
            >
                Type in an address, postcode, or suburb
            </p>
            <BaseInput
                id="pac-input"
                type="text"
                inputRef={(e) => inputRef(e)}
                onChange={(e) => setAddress(e.currentTarget.value)}
            />
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
                onClick={() => getLocation()}
            >
                {loading ? "Loading..." : "Use my location"}
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
                Cancel
            </Button>
        </Modal>
    );
};

export default LocationModal;
