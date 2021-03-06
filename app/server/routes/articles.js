'use strict';

exports.name = '/routes/articles';
exports.requires = [
	'/app',
	'/middlewares/articles',
	'/routes/shortcut',
];
exports.factory = function(app, articles, shortcut) {
	app._get('articles', '/articles',
			articles.highlightedArticles(5),
			shortcut.render('pages/articles'));

	app._get('articles.detail', '/articles/:id',
			articles.identify('id'),
			articles.relatedArticles,
			shortcut.render('pages/article-detail'));

	app.get('/api/articles', articles.query, shortcut.json('_articles'));
};
