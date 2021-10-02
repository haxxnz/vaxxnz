interface MetaData {
  a: string;
  address_line_1: string;
  aims_address_id: string;
  aims_road_section_id: string;
  alpha: string;
  cb: string;
  cb_id: string;
  city: string;
  con: string;
  con_id: string;
  dpid: string;
  iur: string;
  iur_id: string;
  landwater: string;
  landwater_id: string;
  mailtown: string;
  maoricon: string;
  maoricon_id: string;
  meshblock: string;
  number: string;
  post_street: string;
  post_street_name: string;
  post_suburb: string;
  postal: string;
  postal_line_1: string;
  postal_line_2: string;
  postal_line_3: string;
  postcode: string;
  primary_parcel_id: string;
  pxid: string;
  region: string;
  region_id: string;
  rural: boolean;
  sa1_id: string;
  sa2: string;
  sa2_id: string;
  selected_city: string;
  selected_suburb: string;
  street: string;
  street_name: string;
  street_type: string;
  suburb: string;
  success: boolean;
  sufi: number;
  ta: string;
  ta_id: string;
  tasub: string;
  tasub_id: string;
  ur: string;
  ur_id: string;
  ward: string;
  ward_id: string;
  x: string;
  y: string;
}
type Widget = {
  on: (
    eventname: string,
    callback: (fullAddress: string, metaData: MetaData) => void
  ) => void;
};
type Options = unknown;
interface AddressFinderClass {
  Widget: new (
    arg1: HTMLElement | null,
    arg2: string,
    arg3: string,
    arg4: Options
  ) => Widget;
}
declare const AddressFinder: AddressFinderClass | undefined;
