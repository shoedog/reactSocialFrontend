const webpack = require('webpack');
const { match } = require('react-router');
const { createLocation } = require('history');
const {env} = require('./../env');
const {renderEngine} = require('./renderEngine');
const routes = require('../../src/routes');

const query = (file, callback) => {
    if (!env.isProduction) {
        webpack.query(file, function (err, body) {
            callback(err, body);
        });
    } else {
        // production read file from...
        callback(null, null);
    }
};

// Router middleware
module.export = {

 function(req, res, next) {
        query('index.html', function (err, body) {
            let location = createLocation(req.url);
            match({
                routes,
                location
            }, (error, redirectLocation, renderProps) => {
                if (error) {
                    res.status(500).send(error.message);
                } else if (redirectLocation) {
                    res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
                } else if (renderProps) {
                    renderEngine(
                        env.ssrEnabled,
                        renderProps,
                        body
                    ).then(function (html) {
                        res.status(200).send(html);
                    }, function (error2) {
                        console.error('failed to load', error2);
                        res.status(500).send(JSON.stringify(error2));
                    });
                } else {
                    res.status(404).send();
                }
            });
        });
    }
};