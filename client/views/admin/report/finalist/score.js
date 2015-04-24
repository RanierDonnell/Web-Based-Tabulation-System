// var candidateScore = 0;

Template.finalistScore.onCreated(function() {
	this.subscribe('finalists');
	this.subscribe('finalCandidate');
	this.subscribe('judges');
	// this.subscribe('candidates');
});

Template.finalistScore.helpers({
	candidates: function() {
		// return _.sortBy(Candidates.find().fetch(), 'number');
		return Candidates.find({}, {sort: {total: -1}, limit: 5}).fetch();
	},
	resetCandidateScore: function() {
		candidateScore = 0;
	},
	getJudgeScore: function(judge, candidate) {
		var judgeId = Meteor.users.findOne({username: judge})._id;
		var score = Finalists.findOne({judgeId: judgeId, candidateId: candidate}).total;
		candidateScore += score;
		// var judgeCount = Meteor.users.find({'profile.deleted': 0, 'profile.roles': {$in: ['judge']}}).count();
		// candidateScore = parseFloat(candidateScore) / parseFloat(judgeCount);
		return parseFloat(score).toFixed(2);
	},
	getCandidateScore: function(candidate) {
		var score = 0;
		Finalists.find({candidateId: candidate}).forEach(function(e) {
			score += parseFloat(e.total);
		});
		var judgeCount = Meteor.users.find({'profile.deleted': 0, 'profile.roles': {$in: ['judge']}}).count();
		score = parseFloat(score) / parseFloat(judgeCount);
		return score.toFixed(2);
	}
});