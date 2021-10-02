import { useEffect, useState } from "react";

export function useAddressFinder() {
  const [addressFinderClass, setAddressFinderClass] = useState<
    AddressFinderClass | undefined
  >(undefined);
  useEffect(function () {
    function downloadAddressFinder() {
      var script = document.createElement("script");
      script.src = "https://api.addressfinder.io/assets/v3/widget.js";
      script.async = true;
      script.onload = () => {
        setAddressFinderClass(AddressFinder);
      };
      document.body.appendChild(script);
    }
    downloadAddressFinder();
  }, []);
  return addressFinderClass;
}
