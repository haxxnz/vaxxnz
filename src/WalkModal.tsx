import { Button, KIND } from "baseui/button";
import { BaseInput } from "baseui/input";
import { Modal } from "baseui/modal";
import { useCallback, useState } from "react";
import "./App.css";

type Props = {
    walkIsOpen: boolean;
    setWalkIsOpen: (isOpen: boolean) => void;
};

const WalkModal = (props: Props) => {
    const [loading] = useState<boolean>(false);
    const { setWalkIsOpen } = props;

    const close = useCallback(() => {
        setWalkIsOpen(false);
    }, [setWalkIsOpen]);

    return (
        <Modal
            onClose={close}
            isOpen={!!props.walkIsOpen}
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
                Henderson Vaccination Centre
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
                }}
            >
                This vaccination centre allows you to walk up and get a
                vaccination, no booking necessary. Just remember to maintain
                social distancing, and bring a mask!
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
                <strong> Hours</strong>
                <br />
                Mon - fri 8am - 4.30pm (first appointments at 9am, last
                appointments at 3.30pm)
                <br /> Sat 9:00 AM – 2:00 PM
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
                <a href="tel:">09 123 123</a>
            </p>
            <p
                style={{
                    marginTop: "1rem",
                    marginBottom: "0.5rem",
                    fontSize: "1.25rem",
                    paddingBottom: "1.5rem",
                }}
            >
                <strong> Address</strong>
                <br />
                Henderson Vaccination Centre, 28 Catherine Street, Henderson
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
                onClick={close}
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
