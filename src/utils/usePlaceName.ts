import { DEFAULT_LOCATION } from "./consts";
import { useSearchParams } from "./url";

export function usePlaceName() {
  const { placeName } = useSearchParams();
  return placeName || DEFAULT_LOCATION.placeName;
}
