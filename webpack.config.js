const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = (env, argv) => {

    const isProd = argv.mode === 'production'

    const filename = (ext) => isProd ? `[name].[contenthash:8].bundle.${ext}` : `[name].bundle.${ext}`

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
            extensions: ['.js'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@core': path.resolve(__dirname, 'src', 'core'),
            }
        },
        devServer: {
            port: 3000,
            open: true,
            hot: true,
            watchFiles: './',
        },
        devtool: isProd ? false : 'source-map',
        plugins: [
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
        ],
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