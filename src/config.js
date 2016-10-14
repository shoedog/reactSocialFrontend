
if (process.env.BROWSER) {
  module.exports = window.__CONFIG__;
} else {
  module.exports = require('../Assets/client-config.json');
}