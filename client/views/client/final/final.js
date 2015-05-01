Template.finalist.onCreated(function() {
	this.subscribe('finalCandidate');
	this.subscribe('finalistsJudge', {
		eventId: Router.current().params._id,
		judgeId: Meteor.user()._id
	});
	this.subscribe('settings');
});

Template.finalist.rendered = function() {
	Session.set('index', 0);

	Meteor.setTimeout(function() {
		$('#criteria-1').focus();
	}, 300);
}

Template.finalist.events({
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
		if(Session.get('selectedCandidateNumber') > _.first(Session.get('candidateNumbers'))) {
			Session.set('index', Session.get('index') - 1);
			var index = Session.get('index');
			Session.set('selectedCandidateNumber', Session.get('candidateNumbers')[index]);
			var id = Candidates.findOne({number: Session.get('selectedCandidateNumber')})._id;
			Session.set('selectedCandidateId', id);
		}

		Meteor.setTimeout(function() {
			$('#criteria-1').focus();
		}, 300);
	},
	'click #next': function(evt, tmpl) {
		evt.preventDefault();

		if(Session.get('selectedCandidateNumber') < _.last(Session.get('candidateNumbers'))) {
			Session.set('index', Session.get('index') + 1);
			var index = Session.get('index');
			Session.set('selectedCandidateNumber', Session.get('candidateNumbers')[index]);
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

		Meteor.call('addFinalistScore', criteria, function(error) {
			if(error) {
				Materialize.toast(error.reason, 4000, 'red darken-2');
			}
		});
	}
});

Template.finalist.helpers({
	candidates: function() {
		return _.sortBy(Candidates.find().fetch(), 'number');
	},
	candidate: function(id) {
		var id = Candidates.findOne({number: Session.get('selectedCandidateNumber')})._id;
		return Candidates.findOne(id);
	},
	image: function() {
		var id = Candidates.findOne({number: Session.get('selectedCandidateNumber')})._id;
		return Images.find({'metadata.owner': id});
	},
	selected: function(number) {
		return Session.get('selectedCandidateNumber') == number;
	},
	setSelectedCandidate: function() {
		var candidate = _.sortBy(Candidates.find().fetch(), 'number');
		var numbers = [];

		candidate.forEach(function(obj) {
			numbers.push(obj.number);
		});

		Session.set('candidateNumbers', numbers);
		var index = Session.get('index');
		Session.set('selectedCandidateNumber', Session.get('candidateNumbers')[index]);
	},
	setSelectedCandidateId: function() {
		var number = Session.get('candidateNumbers')[0];
		var id = Candidates.findOne({number: number})._id;
		Session.set('selectedCandidateId', id);
	},
	finalist: function() {
		return Finalists.findOne({candidateId: Session.get('selectedCandidateId')});
	}
});