var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './components/run.js',
    output: { path: __dirname, filename: './app/static/js/bundle.js' },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
};