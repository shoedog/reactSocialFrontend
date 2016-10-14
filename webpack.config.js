var path    = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var AssetsPlugin      = require('assets-webpack-plugin');
const autoprefixer = require('autoprefixer');

var buildHash = process.env.NODE_ENV === "production" ? "[hash]" : "dev";

module.exports = {

  entry:  [
    path.resolve('./src/client.js'),
  ],
  output: {
    path: path.join(__dirname, 'public/static/dist/', buildHash),
    filename: 'bundle.js',
    publicPath: "static/dist/" + buildHash + "/"
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss', '.json'],
    modulesDirectories: ['node_modules',  path.resolve(__dirname, './node_modules'), 'src'],
    root: [
      path.resolve('./src'),
    ]
    /** TODO we can use this with the paths in config so we don't
     * have to use relative paths in our file imports in src
     * need to import mapValues from 'lodash/mapValues';
     *
     * alias: mapValues(RESOLVE_PATHS, (str) => (
     * path.join(process.cwd(), ...str.split('/'))
     * ))
     */
  },
  module: {
    loaders: [
      { test: /\.jsx?$|\.js$/, loader: 'babel', exclude: [/node_modules/, /static/]  },
      {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract('style', 'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]_[local]__[hash:base64:5]!postcss!sass')
      },

      //{ test: /\.css/, loader: 'css-loader', query: { modules: true, localIdentName: '[name]__[local]___[hash:base64:5]'}  },
      { test: /\.json$/, loader: "json-loader" },
    ]
  },
  postcss: [autoprefixer],
  sassLoader: {
    //We use this if we create a custom theme
    //data: '@import "' + path.resolve(__dirname, 'theme/_theme.scss') + '";',
    //includePaths: [path.resolve(__dirname, './src/app')]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'BROWSER': JSON.stringify(true),
        'NODE_ENV': JSON.stringify( process.env.NODE_ENV || 'development' ),
      }
    }),
    //Extracts CSS for a separate bundle so we can SSR
    new ExtractTextPlugin('bundle.css', { allChunks: true}),
    //Splits CSS and JS so we can SSR!
    new AssetsPlugin({path: path.join(__dirname, 'Assets')}),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
  ],

//  , { allChunks: true}

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
