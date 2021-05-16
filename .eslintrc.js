module.exports = {
	root: true,
	env: {
		node: true,
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
	extends: ['eslint:recommended', 'plugin:vue/essential', 'plugin:prettier/recommended'],
	rules: {
		'prettier/prettier': [
			'error',
			{
				singleQuote: true,
				semi: true,
				useTabs: true,
				tabWidth: 2,
				trailingComma: 'all',
				printWidth: 120,
				bracketSpacing: true,
				arrowParens: 'avoid',
			},
		],
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
	},
};
