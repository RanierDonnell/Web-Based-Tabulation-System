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

Meteor.publish('gownsJudge', function(options) {
	return Gowns.find({eventId: options.eventId, judgeId: options.judgeId});
});

Meteor.publish('interviewsJudge', function(options) {
	return Interviews.find({eventId: options.eventId, judgeId: options.judgeId});
});

Meteor.publish('swimwearsJudge', function(options) {
	return Swimwears.find({eventId: options.eventId, judgeId: options.judgeId});
});

Meteor.publish('talentsJudge', function(options) {
	return Talents.find({eventId: options.eventId, judgeId: options.judgeId});
});

Meteor.publish('finalistsJudge', function(options) {
	return Finalists.find({eventId: options.eventId, judgeId: options.judgeId});
});

Meteor.publishComposite('talents', {
	find: function() {
		return Talents.find();
	},
	children: [
		{
			find: function(talent) {
				return Candidates.find({_id: talent.candidateId});
			}
		}
	]
});

Meteor.publishComposite('swimwears', {
	find: function() {
		return Swimwears.find();
	},
	children: [
		{
			find: function(swimwear) {
				return Candidates.find({_id: swimwear.candidateId});
			}
		}
	]
});

Meteor.publishComposite('gowns', {
	find: function() {
		return Gowns.find();
	},
	children: [
		{
			find: function(gown) {
				return Candidates.find({_id: gown.candidateId});
			}
		}
	]
});

Meteor.publishComposite('interviews', {
	find: function() {
		return Interviews.find();
	},
	children: [
		{
			find: function(interview) {
				return Candidates.find({_id: interview.candidateId});
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