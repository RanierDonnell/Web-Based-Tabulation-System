Template.category.onCreated(function() {
	this.subscribe('activatedEvent');
});

Template.category.events({
	'click #logout': function(evt, tmpl) {
		evt.preventDefault();
		Meteor.logout();
	}
});

Template.category.helpers({
	judge: function() {
		return Meteor.users.findOne();
	},
	events: function(name) {
		return Events.find().fetch();
	},
	image: function(id) {
		return Images.find({'metadata.owner': id});
	},
	removeSpace: function(str) {
		return str.replace(/\s+/g, '');
	}
});