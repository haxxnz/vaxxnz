const addressFinderAPIKey = "ARFHPVK67QXM49BEWDL3";
const reverseGeocodeURL =
  "https://api.addressfinder.io/api/nz/address/reverse_geocode/?";
const addressMetadataURL =
  "https://api.addressfinder.io/api/nz/address/metadata/?";

// Expected API response from addressfinder.nz rever geocoding endpoint.
// https://addressfinder.nz/api/nz/address/reverse_geocode/
interface ReverseGeocodeResp {
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

interface AddressMetaResp {
  success: boolean;
  city: string;
  suburb: string;
}

async function getSuburb(lat: number, lng: number): Promise<string> {
  let geocoded = await reverseGeocode(lat, lng);
  return await extractSuburb(geocoded);
}

async function reverseGeocode(lat: number, lng: number): Promise<AddressResp> {
  try {
    let params = new URLSearchParams({
      key: addressFinderAPIKey,
      format: "json",
      y: lat.toString(),
      x: lng.toString(),
    });

    let resp = await fetch(reverseGeocodeURL + params);
    let data: ReverseGeocodeResp = await resp.json();
    if (!data.success || data.completions.length === 0) {
      throw new Error("no result returned from reverse geocode query");
    }

    return data.completions[0];
  } catch (err) {
    throw new Error(`error making reverse geocode query: ${err}`);
  }
}

async function extractSuburb(geocoded: AddressResp): Promise<string> {
  try {
    let params = new URLSearchParams({
      key: addressFinderAPIKey,
      format: "json",
      pxid: geocoded.pxid,
    });

    let resp = await fetch(addressMetadataURL + params);
    let data: AddressMetaResp = await resp.json();

    if (!data.success || (!data.suburb && !data.city)) {
      throw new Error(
        "no valid result returned from address metadata endpoint"
      );
    }

    // Handle edge case where suburb is not provided by endpoint.
    if (!data.suburb) {
      return data.city;
    }

    return data.suburb;
  } catch (err) {
    throw new Error(`error making address metadata query: ${err}`);
  }
}

export default getSuburb;
