Template.login.rendered = function() {
	$('#username').focus();

	// id = Accounts.createUser({
	// 	username: 'admin',
	// 	password: '1234',
	// 	profile: {
	// 		fname: 'kelvin martin',
	// 		lname: 'ligue',
	// 		roles: ['admin', 'judge']
	// 	}
	// });
}

Template.login.events({
	'submit form': function(evt, tmpl) {
		evt.preventDefault();

		var username = tmpl.find('#username').value,
			password = tmpl.find('#password').value;

		var result = Meteor.loginWithPassword(username, password, function(error) {
			if(error) {
				Materialize.toast(error.reason, 4000, 'red darken-2');
			}
			else {
				if(_.indexOf(Meteor.user().profile.roles, 'admin') >= 0) {
					Router.go('adminDashboard');
				}
				else {
					
				}
			}
		});
	}
})