import { useRouter } from "next/router";

export function useRadiusKm() {
    const router = useRouter();
    const radius = router.query.radius?.toString();
    return radius
        ? radius === "10closest"
            ? "10closest"
            : parseInt(radius.toString(), 10)
        : 10;
}
