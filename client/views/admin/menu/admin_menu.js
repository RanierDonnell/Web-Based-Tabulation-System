Template.adminMenu.rendered = function() {
	$('.button-collapse').sideNav();
}

Template.adminMenu.events({
	'click #logout': function(evt, tmpl) {
		Meteor.logout();
	}
});

Template.adminMenu.helpers({
	formTitle: function() {
		return Session.get('formTitle');
	},
	isActive: function(title) {
		return Session.get('formTitle') == title ? 'active' : '';
	},
	getFormColor: function() {
		return Session.get('formColor');
	}
});