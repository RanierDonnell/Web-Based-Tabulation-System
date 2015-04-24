// var candidateScore = 0;

Template.interviewReport.onCreated(function() {
	this.subscribe('interviews');
	this.subscribe('judges');
	this.subscribe('candidates');
});

Template.interviewReport.helpers({
	candidates: function() {
		return _.sortBy(Candidates.find().fetch(), 'number');
	},
	resetCandidateScore: function() {
		candidateScore = 0;
	},
	getJudgeScore: function(judge, candidate) {
		var candidateScore = 0;
		var judgeId = Meteor.users.findOne({username: judge})._id;
		var score = Interviews.findOne({judgeId: judgeId, candidateId: candidate}).total;
		candidateScore += score;
		return parseFloat(score).toFixed(2);
	},
	getCandidateScore: function(candidate) {
		var score = 0;
		Interviews.find({candidateId: candidate}).forEach(function(e) {
			score += parseFloat(e.total);
		});
		return score.toFixed(2);
	}
});