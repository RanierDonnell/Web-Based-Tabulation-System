// set primary field
Candidates._ensureIndex({number: 1}, {unique: 1});


// publications
Meteor.publish('judges', function() {
	return Meteor.users.find({'profile.deleted': 0, 'profile.roles': {$in: ['judge']}});
});

Meteor.publish('judge', function(options) {
	return Meteor.users.find({'_id': options._id});
});

Meteor.publishComposite('candidates', {
	find: function() {
		return Candidates.find();
	},
	children: [
		{
			find: function(candidate) {
				return Images.find({'metadata.owner': candidate._id});
			}
		}
	]
});

Meteor.publishComposite('finalCandidate', {
	find: function() {
		return Settings.find();
	},
	children: [
		{
			find: function(setting) {
				return Candidates.find({}, {sort: {score: -1}, limit: parseInt(setting.top)});
			},
			children: [
				{
					find: function(candidate, setting) {
						return Images.find({'metadata.owner': candidate._id});
					}
				}
			]
		}
	]
});

Meteor.publish('images', function(options) {
	return Images.find();
});

Meteor.publishComposite('candidate', function(options) {
	return {
		find: function() {
			return Candidates.find({'_id': options._id});
		},
		children: [
			{
				find: function(candidate) {
					return Images.find({'metadata.owner': candidate._id});
				}
			}
		]
	}
});

Meteor.publishComposite('events', {
	find: function() {
		return Events.find();
	},
	children: [
		{
			find: function(event) {
				return Images.find({'metadata.owner': event._id});
			}
		}
	]
});

Meteor.publishComposite('event', function(options) {
	return {
		find: function() {
			return Events.find({'_id': options._id});
		},
		children: [
			{
				find: function(event) {
					return Images.find({'metadata.owner': event._id});
				}
			}
		]
	}
});

Meteor.publishComposite('activatedEvent', {
	find: function() {
		return Events.find({activate: 1});
	},
	children: [
		{
			find: function(event) {
				return Images.find({'metadata.owner': event._id});
			}
		}
	]
});

Meteor.publish('settings', function() {
	return Settings.find();
});

Meteor.publish('festivalAttiresJudge', function(options) {
	return FestivalAttires.find({eventId: options.eventId, judgeId: options.judgeId});
});

Meteor.publish('menInShortsJudge', function(options) {
	return MenInShorts.find({eventId: options.eventId, judgeId: options.judgeId});
});

Meteor.publish('formalAttiresJudge', function(options) {
	return FormalAttires.find({eventId: options.eventId, judgeId: options.judgeId});
});

Meteor.publish('productionNumbersJudge', function(options) {
	return ProductionNumbers.find({eventId: options.eventId, judgeId: options.judgeId});
});

Meteor.publish('casualInterviewsJudge', function(options) {
	return CasualInterviews.find({eventId: options.eventId, judgeId: options.judgeId});
});

Meteor.publish('finalistsJudge', function(options) {
	return Finalists.find({eventId: options.eventId, judgeId: options.judgeId});
});

Meteor.publishComposite('productionNumbers', {
	find: function() {
		return ProductionNumbers.find();
	},
	children: [
		{
			find: function(productionNumber) {
				return Candidates.find({_id: productionNumber.candidateId});
			}
		}
	]
});

Meteor.publishComposite('formalAttires', {
	find: function() {
		return FormalAttires.find();
	},
	children: [
		{
			find: function(formalAttire) {
				return Candidates.find({_id: formalAttire.candidateId});
			}
		}
	]
});

Meteor.publishComposite('festivalAttires', {
	find: function() {
		return FestivalAttires.find();
	},
	children: [
		{
			find: function(festivalAttire) {
				return Candidates.find({_id: festivalAttire.candidateId});
			}
		}
	]
});

Meteor.publishComposite('menInShorts', {
	find: function() {
		return MenInShorts.find();
	},
	children: [
		{
			find: function(menInShorts) {
				return Candidates.find({_id: menInShorts.candidateId});
			}
		}
	]
});

Meteor.publishComposite('casualInterviews', {
	find: function() {
		return CasualInterviews.find();
	},
	children: [
		{
			find: function(casualInterview) {
				return Candidates.find({_id: casualInterview.candidateId});
			}
		}
	]
});

Meteor.publishComposite('finalists', {
	find: function() {
		return Finalists.find();
	},
	children: [
		{
			find: function(finalist) {
				// return Candidates.find({_id: finalist.candidateId});
			}
		}
	]
});

Meteor.publishComposite('fourthRunnerUp', {
	find: function() {
		return Settings.find();
	},
	children: [
		{
			find: function(setting) {
				return Candidates.find({}, {sort: {score: -1}, limit: parseInt(setting.top)});
			},
			children: [
				{
					find: function(candidate, setting) {
						return Finalists.find({candidateId: candidate._id});
					}
				}
			]
		}
	]
});