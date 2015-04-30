// var candidateScore = 0;

Template.swimwearReport.onCreated(function() {
	this.subscribe('swimwears');
	this.subscribe('judges');
	this.subscribe('candidates');
});

Template.swimwearReport.helpers({
	candidates: function() {
		return _.sortBy(Candidates.find().fetch(), 'number');
	},
	resetCandidateScore: function() {
		candidateScore = 0;
	},
	getJudgeScore: function(judge, candidate) {
		var candidateScore = 0;
		var judgeId = Meteor.users.findOne({username: judge})._id;
		var score = Swimwears.findOne({judgeId: judgeId, candidateId: candidate}).total;
		candidateScore += score;
		return parseFloat(score).toFixed(2);
	},
	getCandidateScore: function(candidate) {
		var score = 0;
		Swimwears.find({candidateId: candidate}).forEach(function(e) {
			score += parseFloat(e.total);
		});
		var judgeCount = Meteor.users.find({'profile.deleted': 0, 'profile.roles': {$in: ['judge']}}).count();
		score = parseFloat(score) / parseFloat(judgeCount);
		return score.toFixed(2);
	}
});