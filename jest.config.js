'use strict';

module.exports = {
	testPathIgnorePatterns: ['/lib/'],
	setupFilesAfterEnv: [
		'@testing-library/jest-dom/extend-expect',
	],
};
