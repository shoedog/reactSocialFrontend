'use strict';
const env = process.env.NODE_ENV || 'DEVELOPMENT';
// set env variable
const hasSSREnabled = (process.env.SSR || process.argv[2] === 'ssr') || false;

module.exports =  {
    name: env,
    isProduction: env === 'PRODUCTION',
    isDevelopment: env === 'DEVELOPMENT',
    ssrEnabled: hasSSREnabled
};