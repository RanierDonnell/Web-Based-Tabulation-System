Template.deleteEvent.onCreated(function() {
	var options = {
		_id: Router.current().params._id
	}

	this.subscribe('event', options);
});

Template.deleteEvent.rendered = function() {
	Session.set('formTitle', 'Event');
	Session.set('formColor', 'green darken-2');
}

Template.deleteEvent.events({
	'submit form': function(evt, tmpl) {
		evt.preventDefault();

		var options = {
			_id: Router.current().params._id
		}

		Meteor.call('deleteEvent', options, function(error) {
			if(error) {
				Materialize.toast(error.reason, 4000, 'red darken-2');
			}
			else {
				Router.go('event');
			}
		});
	}
});

Template.deleteEvent.helpers({
	event: function() {
		return Events.findOne({_id: Router.current().params._id});
	}
});