const addressFinderAPIKey = "ARFHPVK67QXM49BEWDL3";
const reverseGeocodeURL =
  "https://api.addressfinder.io/api/nz/address/reverse_geocode/?";

// Expected API response from addressfinder.nz rever geocoding endpoint.
// https://addressfinder.nz/api/nz/address/reverse_geocode/
export interface ReverseGeocodeResp {
  completions: AddressResp[];
  paid: boolean;
  demo: boolean;
  success: boolean;
}

interface AddressResp {
  // a is the canonical addressas supplied by Land Information New Zealand or NZ Post.
  a: string;
  // The unique address identifier used by addressfinder.nz.
  pxid: string;
}

// TODO(2021-09-13): handle error/edge cases better!
async function getSuburb(lat: number, lng: number): Promise<string> {
  try {
    let params = new URLSearchParams({
      key: addressFinderAPIKey,
      format: "json",
      y: lat.toString(),
      x: lng.toString(),
    });

    let resp = await fetch(reverseGeocodeURL + params);
    let data: ReverseGeocodeResp = await resp.json();
    if (data.completions.length === 0 || !data.success) {
      return "";
    }

    return extractSuburb(data.completions[0].a);
  } catch (err) {
    throw new Error(`unable to reverse geocode coordinates: ${err}`);
  }
}

function extractSuburb(addr: string): string {
  let components = addr.split(",");

  if (components.length < 2) {
    return "";
  }

  return components[components.length - 2];
}

export default getSuburb;
