Template.reportJudge.onCreated(function() {
	this.subscribe('judges');
});

Template.reportJudge.rendered = function() {
	Session.set('formTitle', 'Judge');
	Session.set('formColor', 'blue darken-2');
}

Template.reportJudge.events({
	'click #select-judge': function(evt, tmpl) {
		var selectedJudgeId = $('#select-judge').val();
		
		Session.set('selectedJudgeId', selectedJudgeId);
	},
	'click #switch': function(evt, tmpl) {
		var option = $('#switch');

		if(option.is(':checked')) {
			Session.set('finalee', true);
		}
		else {
			Session.set('finalee', false);
		}
	}
});

Template.reportJudge.helpers({
	judges: function() {
		return _.sortBy(Meteor.users.find().fetch(), 'username');
	},
	isJudge: function(role) {
		return _.indexOf(role, 'judge') >= 0 ? true : false;
	},
	isFinalee: function() {
		return Session.get('finalee');
	}
});