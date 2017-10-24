const { resolveOwn } = require('./paths')
// create-react-app development: we're in ./config/
module.exports = {
  appBuild: resolveOwn('../build'),
  appHtml: resolveOwn('../template/index.html'),
  appFavicon: resolveOwn('../template/favicon.ico'),
  appPackageJson: resolveOwn('../package.json'),
  appSrc: resolveOwn('../template/src'),
  appNodeModules: resolveOwn('../node_modules'),
  ownNodeModules: resolveOwn('../node_modules')
};