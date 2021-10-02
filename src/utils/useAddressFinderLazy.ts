import { useEffect, useState } from "react";

export function useAddressFinderLazy() {
  const [AddressFinderLazy, SetAddressFinderLazy] = useState<
    AddressFinderClass | undefined
  >(undefined);
  useEffect(function () {
    function downloadAddressFinder() {
      var script = document.createElement("script");
      script.src = "https://api.addressfinder.io/assets/v3/widget.js";
      script.async = true;
      script.onload = () => {
        SetAddressFinderLazy(AddressFinder);
      };
      document.body.appendChild(script);
    }
    downloadAddressFinder();
  }, []);
  return AddressFinderLazy;
}
