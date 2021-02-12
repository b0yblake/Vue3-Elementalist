const path = require("path");
const globalSassFiles = [
  "./src/assets/stylesheets/_variables.scss",
  "./src/assets/stylesheets/_mixins.scss"
];

module.exports = {
  runtimeCompiler: true,
  chainWebpack: config => {
    const oneOfsMap = config.module.rule("scss").oneOfs.store;
    oneOfsMap.forEach(item => {
      item
        .use("sass-resources-loader")
        .loader("sass-resources-loader")
        .options({
          resources: globalSassFiles
        })
        .end();
    });
  },
  publicPath: ""
}



