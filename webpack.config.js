const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
  
}

const plugins = [
  new HtmlWebpackPlugin({
    template: './public/index.html', 
    favicon: './public/favicon.ico'
}),

]; 

module.exports = {
  mode,
  plugins, 
  entry: './src/index.js',
  devtool: 'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  
  devServer: {
    hot: true,
  },
  
  module: {
      
    rules: [
      
        { test: /\.(html)$/, use: ['html-loader'] },
        {
          test: /\.(s[ac]|c)ss$/i, 
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        }, 
        {
            test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
            type: mode === 'production' ? 'asset' : 'asset/resource', 

          },
          {
            test: /\.(woff2?|eot|ttf|otf)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.js$/,
            exclude: /node_modules/, 
            use: {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true, 
              },
            },
          },
          {
            test: /\.(s[ac]|c)ss$/i,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader : 'css-loader',
                    options : {
                        modules: true
                    }
                },
                'postcss-loader',
                'sass-loader',
            ],
        },
        {
            test: /\.less$/,
            use: [{
                loader: 'style-loader'
            },
            {
                loader: 'css-loader'
            },
            {
                loader: 'less-loader',
                options: {
                    lessOptions: {
                        modifyVars: {
                            'primary-color': '#1da57a',
                            'link-color': '#1da57a',
                            'border-radius-base': '2px',
                        },
                        javascriptEnabled: true,
                    }
                }
            }
        ]
        },
      ],
  }
}