Template.deleteCandidate.onCreated(function() {
	var options = {
		_id: Router.current().params._id
	}

	this.subscribe('candidate', options);
});

Template.deleteCandidate.rendered = function() {
	Session.set('formTitle', 'Candidate');
	Session.set('formColor', 'red darken-2');
}

Template.deleteCandidate.events({
	'submit form': function(evt, tmpl) {
		evt.preventDefault();

		var options = {
			_id: Router.current().params._id
		}

		Meteor.call('deleteImage', options, function(error) {
			if(error) {
				Materialize.toast(error.reason, 4000, 'red darken-2');
			}
			else {
				Meteor.call('deleteCandidate', options, function(error) {
					if(error) {
						Materialize.toast(error.reason, 4000, 'red darken-2');
					}
					else {
						Router.go('candidate');
					}
				});
			}
		});
	}
});

Template.deleteCandidate.helpers({
	candidate: function() {
		return Candidates.findOne({_id: Router.current().params._id});
	},
	image: function() {
		return Images.find();
	},
	getFormColor: function() {
		return Session.get('formColor');
	}
});