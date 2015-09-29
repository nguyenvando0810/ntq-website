'use strict';

exports._ = '/config/mail';
exports._requires = [
	'@lodash',
	'@bluebird',
	'@path',
	'@ect',
	'@nodemailer',
	'@nodemailer-ses-transport',
	'/config/profile'
];
exports._factory = function(_, Promise, path, ect, nodemailer, transport, env) {
	var sender = transport({
		accessKeyId: env.mail.accessKeyId,
		secretAccessKey: env.mail.secretAccessKey,
		region: env.mail.region
	});

	var transporter = nodemailer.createTransport(sender);
	var send = Promise.promisify(transporter.sendMail, transporter);

	var templateDir = path.resolve(env._root, 'mails');
	var engine = ect({
		watch: true,
		ext: '.ect',
		root: templateDir
	});

	var self = {};

	self.render = function(template, data) {
		return engine.render(template, data);
	};

	self.send = function(options) {
		var html = self.render(options.template, options.data);

		return send({
			from: env.mail.from,
			to: env.mail.to,
			subject: options.subject,
			html: html
		});
	};

	return self;
};
