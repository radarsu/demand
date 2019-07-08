import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as path from 'path';
import * as webpack from 'webpack';
import * as ExtraWatchWebpackPlugin from 'extra-watch-webpack-plugin';
import meta from './src/config/meta';

// interfaces
type EnvironmentMode = 'development' | 'production';

// paths
const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');

// mode
const isLocal = true;
const mode: EnvironmentMode = isLocal ? `development` : 'production';
const isDev = mode === 'development';
const filename = isDev ? '[name].[hash].js' : '[name].[chunkhash].js';

// cache
const cacheGroups: any = {
    vendors: {
        priority: -10,
        test: /[\\/]node_modules[\\/]/,
    },
    app: {
        priority: -9,
        test: 'src/app/**/*',
    },
};

// config
const config: webpack.Configuration & { devServer: any } = {
    devServer: meta.webpack.devServer,
    devtool: 'source-map',
    entry: `${src}/bootstrap/index.ts`,
    mode,

    module: {
        rules: [
            // css/scss loader
            {
                test: /\.s?css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: isDev,
                    },
                }, {
                    loader: 'css-loader',
                    options: { importLoaders: 1 },
                }, {
                    loader: 'postcss-loader'
                }, {
                    loader: 'sass-loader',
                    options: {
                        plugins: [
                            require('autoprefixer'),
                        ],
                    },
                }],
            },
            // fonts loader
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/fonts/',
                    },
                }],
            },
            // ts loader
            {
                exclude: [/node_modules/],
                include: [src],
                loader: 'ts-loader',
                test: /\.ts$/,
            },
            // rtml
            {
                test: /\.template.html$/,
                loader: 'raw-loader',
            }],
    },

    optimization: {
        minimize: false,
        namedChunks: true,
        namedModules: true,
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups,
            chunks: 'all',
            minChunks: 1,
            minSize: 0,
        },
    },

    output: {
        filename,
        path: dist,
        sourceMapFilename: '[name].bundle.map',
    },

    plugins: [

        // copy assets and html
        new CopyWebpackPlugin([{
            from: `${src}/assets`,
            to: `${dist}/assets`,
        }, {
            from: `${src}/assets`,
            to: `${dist}/assets`,
        }, {
            from: `${src}/app/**/*.html`,
            to: dist,
        }]),

        // watch html files as they aren't imported
        new ExtraWatchWebpackPlugin({
            files: [
                `${src}/**/*.template.html`, `${src}/**/**/*.template.html`,
                `${src}/**/*.style.css`, `${src}/**/**/*.style.css`,
            ],
        }),

        new HtmlWebpackPlugin({
            template: `${src}/bootstrap/index.html`,
            data: meta.data,
        }),

        // extracts any CSS from any javascript file to process it as LESS/SASS using a loader
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
            chunkFilename: '[id].css',
        }),

        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProgressPlugin(),
    ],

    resolve: {
        extensions: ['.ts', '.js'],
    },

    watch: true,
};

export default config;