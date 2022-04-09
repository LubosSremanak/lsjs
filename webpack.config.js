const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: "production",
    entry: "./main.js",
    output: {
        path: __dirname + '/dist',
        filename: "bundle.js",
    },
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        static: path.join(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CopyPlugin({
            patterns: [
                {from: 'src/assets', to: 'assets'}
            ],
        },),
    ],
    performance: {
        hints: false,
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    node: {
        __filename: true,
        __dirname: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    "css-loader",
                ]
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [
                            ["@babel/plugin-transform-runtime"],
                            ["@babel/plugin-syntax-dynamic-import"]
                        ]
                    }
                }
            },
        ]
    }
}
