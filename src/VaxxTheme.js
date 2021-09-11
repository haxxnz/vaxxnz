import { createTheme } from "baseui";

const primitives = {
  primaryFontFamily:
    ' "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
};
const overrides = {};

const VaxxTheme = createTheme(primitives, overrides);

export default VaxxTheme;
