import { useMemo } from "react";
import { DEFAULT_LOCATION } from "./consts";
import { useRouter } from "next/router";

export function useCoords() {
    const router = useRouter();
    const { lat, lng } = router.query;
    const coords = useMemo(
        () => ({
            lat: lat ? parseFloat(lat.toString()) : DEFAULT_LOCATION.lat,
            lng: lng ? parseFloat(lng.toString()) : DEFAULT_LOCATION.lng,
        }),
        [lat, lng]
    );
    return coords;
}
