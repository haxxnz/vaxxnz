import { getDateFnsLocale } from "./locale";
import { enNZ } from "date-fns/locale";

//TODO(rquitales): Mock i18next for different languages.
describe("getDateFnsLocale", () => {
  it("should return the default enNZ when undefined i18next.language", () => {
    const want = enNZ;
    const got = getDateFnsLocale();

    expect(got).toEqual(want);
  });
});
