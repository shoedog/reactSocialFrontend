import path from 'path';
import webpack from 'webpack';

const nodeModulePath = path.resolve( __dirname, 'node_modules');
const buildPath = path.resolve( __dirname, 'build', 'assets');
const appPath = path.resolve( __dirname, 'src', 'app');
const srcPath = path.resolve( __dirname, 'src', );

const config = {

  //context: path.resolve(__dirname, '/src'),

  entry: [
      'webpack-hot-middleware/client',
      'webpack/hot/only-dev-server',
      appPath
  ],

  output: {
    path: path.resolve( __dirname, 'build', 'assets'),
    filename: 'app.bundle.js',
    sourceMapFilename: 'app.bundle.map',
    publicPath: '/static/'
  },

  //Source map provides support for browser debugging by mapping bundle files
  devtool: '#source-map',

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loaders: ['react-hot', 'jsx?harmony'],
        include: [srcPath],

      },
      {
        test: /\.js$/,
        exclude: [nodeModulePath],
        loaders: ['babel']
      }
    ],
  },

  //Minify bundle
  plugins: [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        mangle: true,
        compress: {
          warnings: false,
        }
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
  ],

};

module.exports = config;

//"dev": "webpack-dev-server --progress --colors -hot",
