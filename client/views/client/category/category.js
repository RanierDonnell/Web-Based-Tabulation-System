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
	events: function(name) {
		return Events.find();
	},
	image: function(id) {
		return Images.find({'metadata.owner': id});
	}
});