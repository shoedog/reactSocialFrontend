var path    = require('path');
var webpack = require('webpack');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');
//const NpmInstallPlugin = require('npm-install-webpack-plugin');
//var WebpackDevServer = require('webpack-dev-server');

module.exports = {
  devtool: 'inline-source-map',
  //context: path.resolve(__dirname, '..'),
  entry:  [
    //`webpack-hot-middleware/client?path=http://localhost:3002/__webpack_hmr`,
    'webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/dev-server',
    path.resolve('./src/client.js')
  ],
  output: {
    //Will be public or set as an env variable in production
    path: path.resolve(__dirname, '../static/dist'),
    filename: 'bundle.js',
    chunkFilename: '[name].[bundle].js',
    // Dev server or set as an env variable in production
    publicPath: `/assets/`
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'src'],
    root: [
      path.resolve('../src'),
    ]
    /*TODO we can use this with the paths in config so we don't
    have to use relative paths in our file imports in src
    need to import mapValues from 'lodash/mapValues';

    alias: mapValues(RESOLVE_PATHS, (str) => (
      path.join(process.cwd(), ...str.split('/'))
    ))*/
  },
  module: {
    loaders: [
      { test: /\.jsx?$|\.js$/, loader: 'babel', exclude: /node_modules/,  },
      { test: /\.css/, loader: 'style-loader' },
      { test: /\.css/, loader: 'css-loader', query: { modules: true, localIdentName: '[name]__[local]___[hash:base64:5]'}  },
      //  'css', 'css?outputStyle=expanded&sourceMap=true&sourceMapContents=true&modules=true',
      //{ test: /\.css/, loaders: ['style', 'css',]}
    ]
  },
  plugins: [
    //new extractTextPlugin("[name].css"),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'BABEL_ENV': JSON.stringify('dev'),
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'BROWSER': JSON.stringify(true)
      }
    })
  ],


  devServer: {
    hot: true,
    //inline: true,
    proxy: {
      '*': 'http://127.0.0.1:' + (process.env.PORT || 3000)
    },
    host: '127.0.0.1',
    noInfo: true
  }
};
