Template.event.onCreated(function() {
	this.subscribe('events');
});

Template.event.rendered = function() {
	Session.set('formTitle', 'Event');
	Session.set('formColor', 'green darken-2');
}

Template.event.events({
	'mouseover table tbody tr': function(evt, tmpl) {
		evt.preventDefault();
		Session.set('eventHover', this._id);
	},
	'mouseout table tbody tr': function(evt, tmpl) {
		evt.preventDefault();
		Session.set('eventHover', false);
	},
	'mouseover .mdi-image-edit': function(evt, tmpl) {
		evt.preventDefault();
		$('.mdi-image-edit').parent().css('color', '#4caf50');
	},
	'mouseout .mdi-image-edit': function(evt, tmpl) {
		evt.preventDefault();
		$('.mdi-image-edit').parent().css('color', 'white');
	},
	'mouseover .mdi-action-highlight-remove': function(evt, tmpl) {
		evt.preventDefault();
		$('.mdi-action-highlight-remove').parent().css('color', '#e53935 ');
	},
	'mouseout .mdi-action-highlight-remove': function(evt, tmpl) {
		evt.preventDefault();
		$('.mdi-action-highlight-remove').parent().css('color', 'white');
	}
});

Template.event.helpers({
	getFormColor: function() {
		return Session.get('formColor');
	},
	events: function() {
		return _.sortBy(Events.find().fetch(), 'name');
	},
	isHover: function(id) {
		return Session.get('eventHover') == id ? true : false;
	}
});