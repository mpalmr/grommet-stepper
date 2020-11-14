'use strict';

module.exports = function babelConfig(api) {
	api.cache(process.env.NODE_ENV !== 'production');

	return {
		presets: [
			['@babel/preset-typescript', {
				isTSX: true,
				allExtensions: true,
			}],
			['@babel/preset-env', { useBuiltIns: false }],
			'@babel/preset-react',
		],
	};
};
