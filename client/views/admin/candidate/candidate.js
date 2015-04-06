Template.candidate.onCreated(function() {
	this.subscribe('candidates');
});


Template.candidate.rendered = function() {
	Session.set('formTitle', 'Candidate');
	Session.set('formColor', 'red darken-2');
}

Template.candidate.events({
	'mouseover table tbody tr': function(evt, tmpl) {
		evt.preventDefault();
	},
	'mouseout table tbody tr': function(evt, tmpl) {
		evt.preventDefault();
	}
});

Template.candidate.helpers({
	getFormColor: function() {
		return Session.get('formColor');
	},
	isHover: function() {
		return Session.get('candidateTableHover');
	}
});