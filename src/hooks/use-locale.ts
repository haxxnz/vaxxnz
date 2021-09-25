import { useRouter } from "next/router";

export const useLocale = () => {
    const router = useRouter();
    return router.locale || router.defaultLocale || "en-NZ";
};
