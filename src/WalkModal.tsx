import { Fragment } from "react";
import { Button, KIND } from "baseui/button";
import { Modal } from "baseui/modal";
import "./App.css";
import { WalkinLocation } from "./getData";

type Props = {
    clearSelectedLocation: () => void;
    location?: WalkinLocation;
};

const WalkModal = ({ clearSelectedLocation, location }: Props) => {
    const close = () => clearSelectedLocation();
    if (location == null) {
        return null;
    }

    return (
        <Modal
            onClose={close}
            isOpen={!!location}
            unstable_ModalBackdropScroll={true}
            overrides={{
                Root: { style: { zIndex: 1500 } },
                Dialog: {
                    style: {
                        height: "auto",
                        width: "50vw",
                        minWidth: "400px",
                        maxWidth: "540px",
                        display: "flex",
                        flexDirection: "column",
                        padding: "1.5rem",
                    },
                },
            }}
        >
            <h1
                style={{
                    marginBottom: "1rem",
                }}
            >
                {location.name}
            </h1>
            <p
                style={{
                    marginTop: "1rem",
                    paddingTop: "1.25rem",
                    marginBottom: "0.5rem",
                    marginRight: "1rem",
                    fontSize: "1.25rem",
                    borderTop: "1px solid lightgray",
                    borderBottom: "1px solid lightgray",
                    paddingBottom: "1.5rem",
                    lineHeight: "1.5",
                }}
            >
                {location.instructionLis.map((instruction, index) => {
                    return (
                        <Fragment key={index}>
                            {instruction}
                            <br />
                        </Fragment>
                    );
                })}
            </p>
            <p
                style={{
                    marginTop: "1rem",
                    marginBottom: "0.5rem",
                    marginRight: "1rem",
                    fontSize: "1.25rem",
                    borderBottom: "1px solid lightgray",
                    paddingBottom: "1.5rem",
                    lineHeight: "1.5",
                }}
            >
                <strong> Hours</strong>
                <br />
                {Object.keys(location.opennningHours.schedule).map(
                    (openDate, index) => {
                        return (
                            <Fragment key={index}>
                                {openDate}{" "}
                                {location.opennningHours.schedule[openDate]}
                                <br />
                            </Fragment>
                        );
                    }
                )}
            </p>
            <p
                style={{
                    marginTop: "1rem",
                    marginBottom: "0.5rem",
                    marginRight: "1rem",
                    fontSize: "1.25rem",
                    borderBottom: "1px solid lightgray",
                    paddingBottom: "1.5rem",
                }}
            >
                <strong> Phone</strong>
                <br />
                {location.telephone && (
                    <a href={`tel:${location.telephone}`}>
                        {location.telephone}
                    </a>
                )}
            </p>
            <p
                style={{
                    marginTop: "1rem",
                    marginBottom: "0.5rem",
                    fontSize: "1.25rem",
                    paddingBottom: "1.5rem",
                    lineHeight: "1.5",
                }}
            >
                <strong> Address</strong>
                <br />
                {location.address}
            </p>
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
                kind={KIND.primary}
                onClick={() => {
                    // Also close the modal to avoid confusing stuff
                    window.open(
                        `https://www.google.com/maps/dir/?api=1&saddr=My+Location&destination=${location.address}`
                    );
                    close();
                }}
            >
                Get directions
            </Button>
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

export default WalkModal;
