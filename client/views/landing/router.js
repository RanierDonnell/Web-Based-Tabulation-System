Router.route('/', {
	name: 'landing',
	template: 'landing',
	title: 'Landing',
	onBeforeAction: function() {
		if(Meteor.user() && _.indexOf(Meteor.user().profile.roles, 'admin') >= 0) {
			Router.go('adminDashboard');
		}

		this.next();
	}
});