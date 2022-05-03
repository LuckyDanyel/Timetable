const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');


const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const plugins = () =>  {
    const basePlugins = [
        
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template:  path.join(__dirname, 'app/index.pug'),
            filename: 'index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new MiniCssExtractPlugin({
            filename: `./css/${filename('css')}`
        }),
      
       
    ];
    if(isProd){
        basePlugins.push(
            
              require('autoprefixer'),
        )
    }

    return basePlugins;
};

module.exports = {
    context: path.resolve(__dirname, 'app'),
    mode: 'development',
    entry: '/js/index.js',
    target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
    watch: true,
    output: {
        filename: `./js/${filename('js')}` ,
        path: path.resolve(__dirname, '../views'),
        assetModuleFilename: 'dist/[name][ext]'
    },
    // mode: 'development',
    // entry: './app/js/index.ts',
    // target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
    // watch: true,
    // output: {
    //   filename: 'bundle.js',
    //   path: path.resolve(__dirname, 'dist'),
    // },
    devServer: {
        historyApiFallback: true,
        static: path.join(__dirname, 'dist'),
        open: true,
        compress: true,
        hot: true,
        port: 8080,
       

    },
    plugins: plugins(),
    devtool: 'source-map',
    module:{
        rules:[
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                    options: {
                        pretty: true
                    }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/i,
                use: [
                {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    hmr: isDev,     
                },
            },
            'css-loader',
            
        
        ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
        
    },
    
           
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, 
                    
                    'css-loader', 
                    'resolve-url-loader',
                    'sass-loader', 
                    'postcss-loader',
                    
                ],
            },
            {
                test: /\.(svg|eot|ttf|woff|woff2|otf)$/,
        
                type: 'asset',
                generator:{
                    filename: 'fonts/[name][ext][query]',
                    publicPath: '../'
                    
                },
              
                
                
            },
            {
                test: /\.(gif|png|jpe?g|)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext][query]',
                    
                }
            },
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
           
        ]
    }
};
