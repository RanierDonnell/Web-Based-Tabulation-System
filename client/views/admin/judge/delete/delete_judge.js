Template.deleteJudge.onCreated(function() {
	var options = {
		_id: Router.current().params._id
	}

	this.subscribe('judge', options);
});

Template.deleteJudge.rendered = function() {
	Session.set('formTitle', 'Judge');
	Session.set('formColor', 'blue darken-2');
}

Template.deleteJudge.events({
	'submit form': function(evt, tmpl) {
		evt.preventDefault();

		var options = {
			_id: Router.current().params._id
		}

		Meteor.call('deleteSystemUser', options, function(error) {
			if(error) {
				Materialize.toast(error.reason, 4000, 'red darken-2');
			}
			else {
				Router.go('judge');
			}
		});
	}
});

Template.deleteJudge.helpers({
	judge: function() {
		return Meteor.users.findOne({_id: Router.current().params._id});
	}
});