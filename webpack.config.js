// 引入包
const path = require('path');

// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin');

// 引入clean-webpack
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // 指定入口文件
    entry: './src/index.ts',

    // 指定打包文件所在目錄
    output: {
        // 指定打包文件的目錄
        path: path.resolve(__dirname, 'dist'),
        // 打包後文件的名字
        filename: "bundle.js",

        // 告訴webpack不使用箭頭函數
        // environment: {
        //     arrowFunction: false,
        //     const: false,
        // }
    },

    // 指定webpack打包時要使用的模塊
    module: {
        // 指定要加載的規則
        rules: [
            {
                // 指定規則生效的文件
                test: /\.ts$/,
                // 要使用的loader(已ts-loader去處理以.ts結尾的文件)
                use: [
                    // 配置babel
                    {
                        // 指定加載器
                        loader: "babel-loader",
                        // 設置babel
                        options: {
                            // 設置預定義的環境
                            presets: [
                                [
                                    // 指定環境插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 要兼容的目標瀏覽器
                                        targets: {
                                            // 瀏覽器版本
                                            "chrome": "88",
                                        },
                                        // 指定corejs的版本
                                        "corejs": "3",
                                        // 使用corejs的方式，usage表示按需加載
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    "ts-loader"
                ],
                // 要排除的文件
                exclude: /node_modules/,
            },
            // 設置less文件的處理
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    // 引入postcss
                    {
                        loader: "postcss-loader",
                        options:
                        {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: "last 2 versions"
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader",
                ]
            }
        ]
    },

    // 配置webpack插件
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            // 生成網頁的模板
            template: "./src/index.html"
        }),
    ],
    
    mode: 'development',

    // 設置引用模塊
    resolve: {
        extensions: ['.ts', '.js'],
    }
};