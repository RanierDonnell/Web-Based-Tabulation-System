Router.route('login', {
	name: 'login',
	template: 'login',
	title: 'Login',
	onBeforeAction: function() {
		if(Meteor.user() && _.indexOf(Meteor.user().profile.roles, 'admin') >= 0) {
			Router.go('adminDashboard');
		}
		else if(Meteor.user() && _.indexOf(Meteor.user().profile.roles, 'judge') >= 0) {
			Router.go('category');
		}

		this.next();
	}
});