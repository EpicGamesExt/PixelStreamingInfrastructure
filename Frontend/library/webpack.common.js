// Copyright Epic Games, Inc. All Rights Reserved.

const package = require('./package.json');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        index: './src/pixelstreamingfrontend.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: [/node_modules/]
            }
        ]
    },
    externals : {},
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new webpack.DefinePlugin({
            LIBRARY_VERSION: JSON.stringify(package.version)
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        globalObject: 'this'
    }
};

// Add each of our package.json dependencies as a external so it is not bundled.
// See: https://webpack.js.org/configuration/externals/
for(let dependency in package.dependencies) {
    module.exports.externals[dependency] = dependency;
}