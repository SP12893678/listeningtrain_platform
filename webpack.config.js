const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        index: './src/index.js',
        game: './src/game.js',
        manage: './src/manage.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    },
                },
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        // Requires sass-loader@^7.0.0
                        options: {
                            implementation: require('sass'),
                            fiber: require('fibers'),
                            indentedSyntax: true, // optional
                        },
                        // Requires sass-loader@^8.0.0
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                fiber: require('fibers'),
                                indentedSyntax: true, // optional
                            },
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'assets/images/[hash:7].[ext]',
                            limit: 10000,
                            esModule: false,
                        },
                    },
                ],
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'assets/video/[name].[hash:7].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/font/[hash:7].[ext]',
                            limit: 100000,
                        },
                    },
                ],
            },
            {
                test: /\.(xlsx)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/xlsx/[name].[ext]',
                            limit: 100000,
                            esModule: false,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: true,
            chunks: ['index'],
            minify: process.env.NODE_ENV == 'development' ? false : true,
        }),
        new HtmlWebpackPlugin({
            template: './src/game.html',
            filename: 'game.html',
            inject: true,
            chunks: ['game'],
            minify: process.env.NODE_ENV == 'development' ? false : true,
        }),
        new HtmlWebpackPlugin({
            template: './src/manage.html',
            filename: 'manage.html',
            inject: true,
            chunks: ['manage'],
            minify: process.env.NODE_ENV == 'development' ? false : true,
        }),
        new VueLoaderPlugin(),
    ],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
            '@': path.resolve('src'),
            Manage: path.resolve('./src/components/manage'),
            Scene: path.resolve('./src/js/game/scene'),
            Component: path.resolve('./src/js/game/component'),
        },
    },
}
