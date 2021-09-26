const { i18n } = require("./next-i18next.config");

/* use this when you need to check why bundle size is big */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: true,
});
module.exports = {
    i18n,
    webpack: function (config) {
        config.externals = config.externals || {};
        config.externals["styletron-server"] = "styletron-server";
        return config;
    },
};
