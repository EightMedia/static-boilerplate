var webpack = require('webpack');

module.exports = {
    cache: true,

    // entry points
    // the key will be the filename in /assets/js/
    entry: {
        common: './src/assets/js/common/index.js',
        site: './src/assets/js/site/index.js'
    },

    devtool: 'source-map',
    output: {
        path: "./httpdocs/assets/js/",
        publicPath: "/assets/js/",
        filename: "[name].js",
        sourceMapFilename: "[file].map"
    },
    resolve: {
        modulesDirectories: ["./node_modules", "./bower_components"],
        extensions: ["", ".coffee", ".js"]
    },
    module: {
        // auto-loaders
        loaders: [
            { test: /\.coffee/, loader: "coffee-loader" }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        )
    ]
};
