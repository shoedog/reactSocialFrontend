/*
 *   Config for Dev Environment, so services know about each other
 *   API Service
 *   Rendering Service
 *   Client
 */


module.exports = {
  port: process.env.PORT || 3000,
  apiHost: 'localhost',
  apiPort: 3001,
  webpackHost: 'localhost',
  webpackPort: 3002,
};