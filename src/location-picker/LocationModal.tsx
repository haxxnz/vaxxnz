import { Button, KIND } from "baseui/button";
import { BaseInput } from "baseui/input";
import { Modal } from "baseui/modal";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { enqueueAnalyticsEvent } from "../utils/analytics";
import { getSuburbIsh } from "../utils/location";
import { Coords } from "./LocationPicker";

type Props = {
  locationIsOpen: boolean;
  setLocationIsOpen: (isOpen: boolean) => void;
  setCoords: (coords: Coords) => void;
  setPlaceName: (name: string) => void;
};

const LocationModal = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setCoords, setPlaceName, setLocationIsOpen } = props;
  const geocoder = useMemo(() => new google.maps.Geocoder(), []);
  const placesService = useMemo(
    () => new google.maps.places.PlacesService(document.createElement("div")),
    []
  );

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
      setCoords({ lat, lng });
      setPlaceName(placeName);
      close();
      const url = new URL(window.location.toString());
      url.searchParams.set("lat", lat.toString());
      url.searchParams.set("lng", lng.toString());
      url.searchParams.set("placeName", placeName);
      enqueueAnalyticsEvent("Location set");
      window.history.pushState({}, "", url.toString());
    },
    [close, setCoords, setPlaceName]
  );
  const inputRef = useCallback(
    (domNode) => {
      if (domNode != null) {
        const widget = new AddressFinder.Widget(
          domNode,
          "ARFHPVK67QXM49BEWDL3",
          "NZ",
          {
            address_params: {
              post_box: "0",
              max: "7",
            },
            show_locations: true,
            location_params: {
              max: "4",
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
              const suburbish = place ? getSuburbIsh(place) : null;
              setLocation(latitude, longitude, suburbish);
              setLoading(false);
            }
          );
        } else {
          setLocation(latitude, longitude);
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
            border: "1px solid lightgray",
            height: "auto",
            width: "600px",
            display: "flex",
            flexDirection: "column",
            padding: "1.5rem",
          },
        },
      }}
    >
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
      <BaseInput
        id="pac-input"
        type="text"
        inputRef={(e) => inputRef(e)}
        onChange={(_e) => {}}
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
