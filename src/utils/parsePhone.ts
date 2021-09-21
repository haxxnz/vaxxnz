//Takes in a string and returns either the first valid phone number or original string

export function parsePhoneNumber(potentialNumber: string | undefined): string {
  let phoneRegex = /[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.0-9]*/;
  let eightHundredRegex = /0800\s[A-Z]+/;
  //Does a standard phone regex, but that will also just return the 0800 from a number like 0800 ORANGA
  //So the function check its length and do an 0800 regex as well
  if (potentialNumber == undefined || null) {
    return "";
  } else if (
    potentialNumber.match(phoneRegex) != null &&
    potentialNumber.match(phoneRegex)![0].length > 5
  ) {
    return potentialNumber.match(phoneRegex)![0].trim();
  } else if (potentialNumber.match(eightHundredRegex) != null) {
    return potentialNumber.match(eightHundredRegex)![0].trim();
  } else {
    return potentialNumber;
  }
}
