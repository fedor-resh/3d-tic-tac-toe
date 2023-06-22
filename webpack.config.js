const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './tic_tac_toe.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        port : 3000,
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({template: './index.html'})
    ]
}