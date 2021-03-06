'use strict';

exports.name = '/config/profile/production';
exports.value = {
	debug: false,
	domain: {
		protocol: 'https',
		base: 'ntq-solution.com.vn',
		locales: {
			en: 'www.ntq-solution.com.vn',
			ja: 'jp.ntq-solution.com.vn',
		},
	},
	port: 4000,
	db: 'mongodb://localhost/mean-dev',
	assets: {
		//cdn: '//www.ntq-solution.com.vn',
		cdn: 'https://server1.mn-cdn.com/p/ntq',
		default: true,
		purgeCache: false,
		rev: true
	},
	upload: {
		doc: '/home/ubuntu/sites/ntq-website-v1/upload/doc'
	},
	mail: {
		to: 'sales@ntq-solution.com.vn',
		from: 'no-reply@they.online',
		region: 'us-west-2',
		accessKeyId: 'AKIAI6W6J2H4K4W3OZKA',
		secretAccessKey: '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'
	}
};
