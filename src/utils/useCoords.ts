import { useMemo } from "react";
import { DEFAULT_LOCATION } from "./consts";
import { useSearchParams } from "./url";

export function useCoords() {
    const { lat, lng } = useSearchParams();
    const coords = useMemo(
        () => ({
            lat: lat ? parseFloat(lat.toString()) : DEFAULT_LOCATION.lat,
            lng: lng ? parseFloat(lng.toString()) : DEFAULT_LOCATION.lng,
        }),
        [lat, lng]
    );
    return coords;
}
