const path = require('path');
const webpack = require('webpack');
var fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const AssetsPlugin = require('assets-webpack-plugin');
const autoprefixer = require('autoprefixer');

//const buildHash = process.env.NODE_ENV === 'production' ? '[hash]' : 'dev';

var clientConfig = {
  name: 'client',

  entry: {
    main: path.resolve('./src/client.js'),
    //path: path.resolve(__dirname, 'src')
  },

  output: {
    path: path.resolve(__dirname, 'public/static/dist/'),
    filename: 'client.js',
    publicPath: 'http://localhost:8000/',
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css', 'scss'],
    modulesDirectories: ['node_modules', path.resolve(__dirname, './node_modules'), 'src'],
    alias: {
      'components': 'src/components'
    },
  },

  module: {
    loaders: [
      { test: /\.jsx?$|\.js$/, loader: 'babel', exclude: [/node_modules/, /static/] },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style','css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss'),
      },
      {
       test: /\.scss$/,
       loader: ExtractTextPlugin.extract('style', 'css-loader?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader')
     },
      { test: /\.json$/, loader: 'json-loader' },
      //{ test: /\.jpg$/, loader: "url-loader?limit=10000&mimetype=image/jpg" },
    ],
  },

  postcss: [
    require('autoprefixer'),
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-simple-vars'),
  ],

  sassLoader: {
    //We use this if we create a custom theme
    data: '@import "' + path.resolve(__dirname, './src/theme/_theme.scss') + '";',
    includePaths: [path.resolve(__dirname, './src/'), path.resolve(__dirname, './node_modules/react-toolbox/')]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        //'BROWSER': JSON.stringify(true),
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    //Extracts CSS for a separate bundle so we can SSR
    new ExtractTextPlugin('styles.css'),
    //Splits CSS and JS so we can SSR!
    //new AssetsPlugin({path: path.join(__dirname, 'Assets')}),
    //new webpack.optimize.UglifyJsPlugin(),
    //new webpack.optimize.DedupePlugin(),
  ],

/*
  devServer: {
    hot: true,
    //inline: true,
    proxy: {
      '*': 'http://127.0.0.1:' + (process.env.PORT || 3000)
    },
    host: '127.0.0.1',
    noInfo: true
  }*/
};

/*
const serverConfig = {
  name: 'server',
  target: 'node',
  externals: [nodeExternals()],
  entry: [
    './src/server/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'public/static/dist/'),
    filename: 'server.js',
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$|\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.css$/,
        loader: 'css-loader/locals?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
      {
        test: /\.scss$/,
        loader: 'css-loader/locals?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader',
      }
    ]
  },
};
*/
//module.exports = [clientConfig, serverConfig];
module.exports = clientConfig;
