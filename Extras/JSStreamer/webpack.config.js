const NodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: { configFile: 'tsconfig.cjs.json' },
                    }
                ],
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }

        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({ title: 'our project', template: 'src/index.html' }),
        new MiniCssExtractPlugin({ filename: "bundle.css" }),
        new CopyPlugin({ patterns: [{ from: 'src/video', to: 'video' }] }),

    ],
    // externals: [ NodeExternals() ],
    devtool: 'source-map',
    devServer: {
        server: {
            type: 'http',
            options: {
                key: './certs/server.key',
                cert: './certs/server.crt',
            },
        },
        static: path.join(__dirname, 'dist'),
        compress: false,
        allowedHosts: "all",
        port: 4000,
    },
}


