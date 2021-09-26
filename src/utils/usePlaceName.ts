import { DEFAULT_LOCATION } from "./consts";
import { useRouter } from "next/router";

export function usePlaceName() {
    const {
        query: { placeName },
    } = useRouter();
    return placeName || DEFAULT_LOCATION.placeName;
}
