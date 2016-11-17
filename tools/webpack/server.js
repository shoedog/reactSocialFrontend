require("babel-register")({
    ignore: /node_modules/,
});

delete process.env.BROWSER;

// Imports
const utils = require('./../env'),
    express = require('express'),
    webPackCustomMiddleware = require('./webpack'),
    router = require('./routing'),
    compression = require('compression'),
    app = express();

// Configuration
const port = utils.env.isProduction ? process.env.PORT : 9000;

// Environment setup
if (utils.env.isDevelopment) {

    // turn this line off to turn off SSR updates
    if (utils.env.ssrEnabled) {
        if (!require("piping")({hook: true, includeModules: false})) {
            return;
        }
    }

    app.use(function (req, res, next) {
        if (req.url !== '/') {
            // if you're not the root url, pass throught the webpack middleware
            webPackCustomMiddleware.WebPackMiddleware(req, res, next);
        } else {
            // Will pass through a middleware to server side render index.html
            next();
        }
    });

    app.use(webPackCustomMiddleware.HotReloadMiddleware);
}


// Other middlewares
app.use(compression());
app.use(router);

app.listen(port, (error) => {
    if (error) { console.error(error); return; }
    console.info('Open up http://localhost:%s/ in your browser.', port);
});