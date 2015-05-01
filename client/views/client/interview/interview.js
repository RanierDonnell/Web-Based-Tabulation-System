Template.interview.onCreated(function() {
	this.subscribe('candidates');
	this.subscribe('interviewsJudge', {
		eventId: Router.current().params._id,
		judgeId: Meteor.user()._id
	});
});

Template.interview.rendered = function() {
	Session.set('selectedCandidateNumber', 1);

	Meteor.setTimeout(function() {
		$('#criteria-1').focus();
	}, 300);
}

Template.interview.events({
	'click #select-candidate': function(evt, tmpl) {
		evt.preventDefault();
		Session.set('selectedCandidateNumber', this.number);
		Session.set('selectedCandidateId', this._id);

		Meteor.setTimeout(function() {
			$('#criteria-1').focus();
		}, 300);
	},
	'click #prev': function(evt, tmpl) {
		evt.preventDefault();
		if(Session.get('selectedCandidateNumber') > 1) {
			Session.set('selectedCandidateNumber', Session.get('selectedCandidateNumber') - 1);
			var id = Candidates.findOne({number: Session.get('selectedCandidateNumber')})._id;
			Session.set('selectedCandidateId', id);
		}

		Meteor.setTimeout(function() {
			$('#criteria-1').focus();
		}, 300);
	},
	'click #next': function(evt, tmpl) {
		evt.preventDefault();

		if(Session.get('selectedCandidateNumber') < Candidates.find().count()) {
			Session.set('selectedCandidateNumber', Session.get('selectedCandidateNumber') + 1);
			var id = Candidates.findOne({number: Session.get('selectedCandidateNumber')})._id;
			Session.set('selectedCandidateId', id);
		}

		Meteor.setTimeout(function() {
			$('#criteria-1').focus();
		}, 300);
	},
	'submit form': function(evt, tmpl) {
		evt.preventDefault();

		var criteria1 = $('#criteria-1').val();

		var total = parseFloat(criteria1 == '' ? '0' : criteria1);

		var criteria = {
			candidateId: Session.get('selectedCandidateId'),
			eventId: Router.current().params._id,
			judgeId: Meteor.user()._id,
			criteria1: criteria1 == '' ? '0' : criteria1,
			total: total		
		};

		Meteor.call('addInterviewScore', criteria, function(error) {
			if(error) {
				Materialize.toast(error.reason, 4000, 'red darken-2');
			}
		});
	}
});

Template.interview.helpers({
	candidates: function() {
		return _.sortBy(Candidates.find().fetch(), 'number');
	},
	candidate: function(id) {
		return Candidates.findOne(Session.get('selectedCandidateId'));
	},
	image: function() {
		return Images.find({'metadata.owner': Session.get('selectedCandidateId')});
	},
	selected: function(number) {
		return Session.get('selectedCandidateNumber') == number;
	},
	setSelectedCandidate: function() {
		var id = Candidates.findOne({number: 1})._id;
		Session.set('selectedCandidateId', id);
	},
	interview: function() {
		return Interviews.findOne({candidateId: Session.get('selectedCandidateId')});
	}
});