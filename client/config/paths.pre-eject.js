const { resolveApp, resolveOwn } = require('./paths')

// before eject: we're in ./node_modules/react-scripts/config/
module.exports = {
  appBuild: resolveApp('build'),
  appHtml: resolveApp('index.html'),
  appFavicon: resolveApp('favicon.ico'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appNodeModules: resolveApp('node_modules'),
  // this is empty with npm3 but node resolution searches higher anyway:
  ownNodeModules: resolveOwn('../node_modules')
};