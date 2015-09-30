'use strict';

exports.name = '/config/locale';
exports.requires = [
	'@lodash',
	'@i18n',
	'@path',
	'@moment',
	'/config/express',
	'/config/profile',
];
exports.factory = function(_, i18n, path, moment, app, profile) {
	i18n.configure({
		locales: ['en', 'ja'],
		defaultLocale: 'en',
		cookie: 'acceptLanguage',
		directory: path.resolve(profile._root, 'config/translations'),
		updateFiles: false,
		objectNotation: false
	});

	app.use(i18n.init);

	app.use(function(req, res, next) {
		// force server use 'en' locale
		i18n.setLocale('en');
		req.setLocale('en');
		res.setLocale('en');
		res.locals.locale = 'en';
		next();
	});

	app.use(function(req, res, next) {
		moment.locale(res.locals.locale);
		next();
	});
};
