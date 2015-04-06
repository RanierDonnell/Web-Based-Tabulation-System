Template.judge.onCreated(function() {
	this.subscribe('judges');
});

Template.judge.rendered = function() {
	Session.set('formTitle', 'Judge');
	Session.set('formColor', 'blue darken-2');
}

Template.judge.events({
	'mouseover table tbody tr': function(evt, tmpl) {
		evt.preventDefault();
		Session.set('judgeHover', this._id);
	},
	'mouseout table tbody tr': function(evt, tmpl) {
		evt.preventDefault();
		Session.set('judgeHover', false);
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

Template.judge.helpers({
	getFormColor: function() {
		return Session.get('formColor');
	},
	judges: function() {
		return _.sortBy(Meteor.users.find().fetch(), 'username');
	},
	isJudge: function(role) {
		return _.indexOf(role, 'judge') >= 0 ? true : false;
	},
	isHover: function(id) {
		return Session.get('judgeHover') == id ? true : false;
	}
});