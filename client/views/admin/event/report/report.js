Template.reportEvent.onCreated(function() {
	this.subscribe('events');
});

Template.reportEvent.rendered = function() {
	Session.set('formTitle', 'Event');
	Session.set('formColor', 'green darken-2');
}

Template.reportEvent.events({
	'click #select-event': function(evt, tmpl) {
		var selectedEventId = $('#select-event').val();
		var selectedEventName = $('#select-event option:selected').text().toUpperCase();

		Session.set('selectedEventId', selectedEventId);
		Session.set('selectedEventName', selectedEventName);
	}
});	

Template.reportEvent.helpers({
	events: function() {
		return Events.find();
	},
	selectedEvent: function(name) {
		return Session.get('selectedEventName') == name;
	}
});