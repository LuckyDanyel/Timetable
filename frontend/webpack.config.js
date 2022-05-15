const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');


const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const plugins = () =>  {
    const basePlugins = [
        
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new HTMLWebpackPlugin({
            template:  path.join(__dirname, 'app/roles/admin/html/admin.pug'),
            filename: `html/admin.html`,
            chunks: ['admin'],
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new HTMLWebpackPlugin({
            template:  path.join(__dirname, 'app/roles/user/html/user.pug'),
            filename: `html/user.html`,
            chunks: ['user'],
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
    entry: {
        admin: '../app/roles/admin/js/admin.js',
        user: '../app/roles/user/js/user.js',
    },
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
                test: /\.vue$/,
                loader: "vue-loader",
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
        alias: {
            vue$: "vue/dist/vue.runtime.esm.js",
        },
        extensions: ['.ts', '.js', '*', 'vue', '.json'],
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
