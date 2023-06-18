module.exports = function (config) {
  config.set({
    plugins: ["karma-firefox-launcher"],
    browsers: ["Firefox"],
  });
};
