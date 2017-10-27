/*
 ./webpack.config.js
 */
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './client/index.html',
    filename: 'index.html',
    inject: 'body',
});
module.exports = {
    entry: './client/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'index_bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|gif|jpg|svg)$/,
                use: 'url-loader?limit=2048&name=assets/[name]-[hash].[ext]',
            },
            {
                test: /\.md$/,
                loader: 'raw-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [HtmlWebpackPluginConfig],
};

