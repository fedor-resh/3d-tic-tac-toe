const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/tic_tac_toe.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                type: 'asset/resource',
            },
            {
                test: /\.ico$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                }
            }
        ],
    },
    devServer: {
        port : 3000,
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: "./src/favicon.ico"
        }),
    ]
}