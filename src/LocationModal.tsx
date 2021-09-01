import { Button, KIND } from "baseui/button";
import { Modal } from "baseui/modal";
import React, { useState } from "react";
import { Input } from "baseui/input";

type Props = {
    locationIsOpen: boolean;
    setLocationIsOpen: any;
    setLat: any;
    setLng: any;
};

const LocationModal = (props: Props) => {
    const [locationInputValue, setLocationInputValue] = useState<string>("");

    const close = () => {
        props.setLocationIsOpen(false);
    };

    const getLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                props.setLat(position.coords.latitude);
                props.setLng(position.coords.longitude);
            });
        }
    };

    const onSubmit = () => {
        // Do something with locationInputValue
    };

    return (
        <Modal
            onClose={close}
            isOpen={!!props.locationIsOpen}
            overrides={{
                Root: { style: { zIndex: 1500 } },
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
            <Input
                autoFocus
                clearable
                value={locationInputValue}
                onChange={(e) => setLocationInputValue(e.currentTarget.value)}
            />
            <p
                className={"clickable"}
                style={{
                    color: "#0057FF",
                    fontWeight: 600,
                    marginBlock: 20,
                }}
                onClick={() => getLocation()}
            >
                Use my location
            </p>
            <Button
                overrides={{
                    Root: {
                        style: {
                            width: "100%",
                            margin: "0.5rem 0",
                        },
                    },
                }}
            >
                Submit
            </Button>
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
