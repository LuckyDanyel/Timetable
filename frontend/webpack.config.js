const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');


const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const plugins = () =>  {
    const basePlugins = [
        
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template:  path.join(__dirname, 'app/pages/index.html'),
            filename: (isProd) ? `html/index.hbs` : `html/index.html`,
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new VueLoaderPlugin(),
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
    entry: '../app/pages/main.js',
    target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
    watch: true,
    output: {
        filename: `./js/${filename('js')}` ,
        path: (isProd) ? path.resolve(__dirname, '../views') : path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'dist/[name][ext]',
    },
    devServer: {
        historyApiFallback: true,
        static: path.join(__dirname, 'dist'),
        open: true,
        compress: true,
        hot: true,
        port: 8080,
       

    },
    devtool: 'source-map',
    module: {
        rules:[
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader', 
                ],
            },
            
            {
                test: /\.pug$/,
                loader: 'pug-plain-loader',
                    options: {
                        pretty: true
                    }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
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
        ],           
    },
    resolve: {
        extensions: [ '.jsx', '.tsx', '.ts', '.js', '.vue' ],
        alias: {
            'vue': '@vue/runtime-dom',
            '@': path.resolve(__dirname, 'app'),
        }
    },
    plugins: plugins(),
};
