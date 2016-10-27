/* The webpack dev server's port to use, in development we
 *  use this to view the client's page
 */
export const WEBPACK_PORT = process.env.WEBPACK_PORT || 9999;
export const PORT = process.env.PORT || 3000;
export const API_PORT = process.env.API_PORT || 5000;
// The hostname to use for the webpack dev server
export const HOST = process.env.HOST || 'localhost';
// The hostname to use for the webpack dev server
export const API_HOST = process.env.API_HOST || 'localhost';
// The URL of the dev server including the hostname and port
export const WEBPACK_URL = `http://${HOST}:${WEBPACK_PORT}`;
// The output path of the completed webpack build
export const OUTPUT_PATH = process.env.OUTPUT_PATH || 'static/dist';
// The asset host to use inside the built webpack files.
//In product, set the ASSET_HOST environment variable.
export const ASSET_HOST = process.env.ASSET_HOST || (WEBPACK_URL + '/assets/');

/* Paths for webpack to resolve into non-relative directories, so that instead
 * of having to use relative paths:
 *
 * import SomeComponents from '../../../../SomeComponent';
 *
 * we can write this instead:
 *
 * import SomeComponent from 'components/SomeComponent';
 */
/*TODO Need to adjust: this is an example
export const RESOLVE_PATHS = {
  actions: 'common/js/actions',
  components: 'common/js/components',
  containers: 'common/js/containers',
  constants: 'common/js/constants',
  css: 'common/css',
  fonts: 'common/fonts',
  images: 'common/images',
  layouts: 'common/layouts',
  lib: 'common/js/lib',
  middleware: 'common/js/middleware',
  reducers: 'common/js/reducers',
  routes: 'common/js/routes',
  selectors: 'common/js/selectors',
  store: 'common/js/store'
};
*/
