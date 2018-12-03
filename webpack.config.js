const path = require('path');

/* Import webpack-manifest-plugin */
const ManifestPlugin = require('webpack-manifest-plugin');
/* Import sw-precache-webpack-plugin */
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
/* Import copy-webpack-plugin */
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
    const isProduction = env === 'production';

    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }]
        },
        devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public')
        },
        plugins: [
            new ManifestPlugin({
                fileName: 'asset-manifest.json',
            }),
            new SWPrecacheWebpackPlugin({
                // By default, a cache-busting query parameter is appended to requests
                // used to populate the caches, to ensure the responses are fresh.
                // If a URL is already hashed by Webpack, then there is no concern
                // about it being stale, and the cache-busting can be skipped.
                dontCacheBustUrlsMatching: /\.\w{8}\./,
                filename: 'service-worker.js',
                logger(message) {
                  if (message.indexOf('Total precache size is') === 0) {
                    // This message occurs for every build and is a bit too noisy.
                    return;
                  }
                  console.log(message);
                },
                minify: true, // minify and uglify the script
                navigateFallback: '/index.html',
                staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
            }),
            new CopyWebpackPlugin([
                { from: 'src/pwa' }, // define the path of the files to be copied
            ])
        ]
    }
};