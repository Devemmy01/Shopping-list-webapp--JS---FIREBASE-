module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{png,html,js,json,css}'
	],
	swDest: '(sw.js)',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};