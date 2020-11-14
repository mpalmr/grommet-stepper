'use strict';

module.exports = {
	root: true,
	extends: 'airbnb-typescript',
	parser: '@typescript-eslint/parser',
	parserOptions: { project: './tsconfig.json' },
	rules: {
		indent: [2, 'tab'],
		'no-tabs': 0,
		'arrow-parens': [2, 'as-needed'],
		'import/prefer-default-export': 0,
		'@typescript-eslint/indent': 0,
		'react/prop-types': 0,
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
	},
	overrides: [
		{
			files: [
				'**/__tests__/*.js',
				'**/__mocks__/*.js',
				'tests/**/*.spec.js',
				'jest.setup.js',
			],
			plugins: ['jest'],
			env: { jest: true },
			rules: {
				'import/no-extraneous-dependencies': [2, { devDependencies: true }],
			},
		},
		{
			files: [
				'.eslintrc.js',
				'babel.config.js',
				'jest.config.js',
			],
			parserOptions: { sourceType: 'script' },
			env: { node: true },
			rules: {
				strict: [2, 'global'],
			},
		},
	],
};
