import { Button, KIND } from "baseui/button";
import { BaseInput } from "baseui/input"
import { Modal } from "baseui/modal";
import { useCallback, useMemo, useState } from "react";
import { Place } from "./googleTypes";

type Props = {
    locationIsOpen: boolean;
    setLocationIsOpen: (isOpen: boolean) => void;
    setLat: (lat: number) => void;
    setLng: (lng: number) => void;
    setPlaceName: (name: string) => void;
};

const LocationModal = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { setLat, setLng, setPlaceName, setLocationIsOpen } = props;

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
        (node) => {
            if (node !== null) {
                const options = {
                    componentRestrictions: { country: "nz" },
                    fields: ["geometry", "name"],
                    strictBounds: false,
                };

                const autocomplete = new google.maps.places.Autocomplete(
                    node,
                    options
                );

                autocomplete.addListener("place_changed", () => {
                    const place: Place = autocomplete.getPlace();
                    setLocation(
                        place.geometry.location.lat(),
                        place.geometry.location.lng(),
                        place.name
                    );

                    console.log("place", place);
                });
                console.log("autocomplete setup", autocomplete);
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
                            fields: ["geometry", "name"],
                        },
                        (place: Place, status: string) => {
                            if (status === "OK") {
                                setLocation(latitude, longitude, place.name);
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
            overrides={{
                // Root: { style: { zIndex: 1500 } },
                Dialog: {
                    style: {
                        width: "auto",
                        height: "auto",
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
            <BaseInput id="pac-input" type="text" ref={inputRef} />
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
                            margin: "0.5rem 0",
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
