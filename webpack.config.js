const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const {plugins} = require('@babel/preset-env/lib/plugins-compat-data');

module.exports = (env, argv) => {

    const isProd = argv.mode === 'production'
    console.log(env, argv.mode)

    const filename = (ext) => isProd ? `[name].[contenthash:8].bundle.${ext}` : `[name].bundle.${ext}`

    const  plugins = () => {
        const base = [
            new HtmlWebpackPlugin({
                    template: './index.html'
                }
            ),
            new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, 'src', 'favicon.ico'),
                        to: path.resolve(__dirname, 'dist')
                    },
                ],
            }),
            new MiniCssExtractPlugin({
                filename: filename('css')
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(argv.mode),
            }),
        ]

        !isProd ? base.push(new ESLintPlugin()) : false

        return base
    }

    return {
        target: 'web',
        context: path.resolve(__dirname, 'src'),
        entry: {
            main: [
                'core-js/stable',
                'regenerator-runtime/runtime',
                './index.js'
            ],
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: filename('js'),
            clean: true,
        },
        resolve: {
            extensions: ['.js', '.json'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@core': path.resolve(__dirname, 'src', 'core'),
            },
            fallback: {
                "fs": false,
                "path": require.resolve("path-browserify"),            },
        },
        devServer: {
            port: 8800,
            open: true,
            hot: true,
            watchFiles: './',
        },
        devtool: !isProd ? 'source-map' : false,
        plugins: plugins(),
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
            ],
        },
    }
}