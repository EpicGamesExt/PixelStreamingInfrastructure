// Copyright Epic Games, Inc. All Rights Reserved.

const { merge } = require('webpack-merge');
const common = require('./webpack.base.js');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
      usedExports: true,
      minimize: true,
      minimizer: [new TerserPlugin({
        extractComments: false,
      })],
    },
    stats: 'errors-only',
	performance: {
		hints: false
	}
});
