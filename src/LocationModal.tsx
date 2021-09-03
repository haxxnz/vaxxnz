import { Button, KIND } from "baseui/button";
import { Modal } from "baseui/modal";
import { useCallback, useState } from "react";

type Props = {
    locationIsOpen: boolean;
    setLocationIsOpen: (isOpen: boolean) => void;
    setLat: (lat: number) => void;
    setLng: (lng: number) => void;
    setLocationName: (name: string) => void;
};

const LocationModal = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { setLat, setLng, setLocationName, setLocationIsOpen } = props;

    const close = useCallback(() => {
        setLocationIsOpen(false);
    }, [setLocationIsOpen]);

    const inputRef = useCallback(
        (node) => {
            if (node !== null) {
                const center = { lat: 50.064192, lng: -130.605469 };
                // Create a bounding box with sides ~10km away from the center point
                const defaultBounds = {
                    north: center.lat + 0.1,
                    south: center.lat - 0.1,
                    east: center.lng + 0.1,
                    west: center.lng - 0.1,
                };
                const options = {
                    bounds: defaultBounds,
                    componentRestrictions: { country: "nz" },
                    fields: ["geometry", "name"],
                    strictBounds: false,
                };

                const autocomplete = new google.maps.places.Autocomplete(
                    node,
                    options
                );

                autocomplete.addListener("place_changed", () => {
                    const place = autocomplete.getPlace();

                    setLat(place.geometry.location.lat());
                    setLng(place.geometry.location.lng());
                    setLocationName(place.name);
                    close();

                    console.log("place", place);
                });
                console.log("autocomplete setup", autocomplete);
            }
        },
        [close, setLat, setLng, setLocationName]
    );

    const getLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
        } else {
            setLoading(true);
            navigator.geolocation.getCurrentPosition((position) => {
                props.setLat(position.coords.latitude);
                props.setLng(position.coords.longitude);
                props.setLocationName(
                    `${position.coords.latitude} ${position.coords.longitude}`
                );
                setLoading(false);
                close();
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
            <input id="pac-input" type="text" ref={inputRef} />
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
