Router.onBeforeAction('authenticate', {
	'authenticate': {
		route: 'login'
	},
	except: ['login', 'landing']
});

Router.onBeforeAction(function() {
	$('.tooltipped').tooltip({delay: 50});
	this.next();
});