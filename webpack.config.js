const path = require('path');

// 외부 플러그인
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 파일 확장자명 정규표현식
const vueRegex = /\.vue$/;
const javascriptRegex = /\.js$/;
const sassRegex = /\.s[ac]ss$/;

// 개발 환경 모드
const mode = process.env.NODE_ENV || 'development';

// path.join() 을 이용한 경로 지정
const entryPoint = path.join(__dirname, 'src', 'main.js');
const templatePoint = path.join(__dirname, 'public', 'index.html');
const buildPoint = path.join(__dirname, 'dist');
const aliasPoint = path.join(__dirname, 'src');

module.exports = {
	mode,

	entry: {
		app: entryPoint,
	},

	module: {
		rules: [
			{
				test: vueRegex,
				use: 'vue-loader',
			},
			{
				test: javascriptRegex,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: sassRegex,
				use: [
					'vue-style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							additionalData: `
                @import './src/assets/scss/style.scss';
              `,
						},
					},
				],
			},
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: templatePoint,
			minify:
				mode === 'production'
					? {
							collapseWhitespace: true,
							removeComments: true,
					  }
					: false,
		}),

		new VueLoaderPlugin(),

		new CleanWebpackPlugin(),
	],

	output: {
		filename: '[name].js',
		path: buildPoint,
	},

	resolve: {
		alias: {
			'@': aliasPoint,
		},
	},
};
