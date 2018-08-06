const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'
module.exports = {
  entry:{
    app:'./src/index.js'
  },
  output:{
    filename:'[name].bundle.js',
    path:path.resolve(__dirname,'dist')
  },
  plugins:[
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title:'房价',
      template:'./src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename:devMode?'[name].css':'[name].[hash].css',
      chunkFilename:devMode?'[id].css':'[id].[hash].css'
    })
  ],
  module:{
    rules:[
      {
        test:/.(sa|sc|c)ss$/,
        use:[
          devMode?'style-loader':MiniCssExtractPlugin.loader,
          'css-loader',
          "postcss-loader",
          'sass-loader'
        ]
      },
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use:['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use:['file-loader']
      }
    ]
  }
}