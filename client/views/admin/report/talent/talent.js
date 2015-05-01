// var candidateScore = 0;

Template.talentReport.onCreated(function() {
	this.subscribe('talents');
	this.subscribe('judges');
	this.subscribe('candidates');
});

Template.talentReport.helpers({
	candidates: function() {
		return _.sortBy(Candidates.find().fetch(), 'number');
	},
	resetCandidateScore: function() {
		candidateScore = 0;
	},
	getJudgeScore: function(judge, candidate) {
		var candidateScore = 0;
		var judgeId = Meteor.users.findOne({username: judge})._id;
		var score = Talents.findOne({judgeId: judgeId, candidateId: candidate}).total;
		candidateScore += score;
		return parseFloat(score).toFixed(2);
	},
	getCandidateScore: function(candidate) {
		var score = 0;
		Talents.find({candidateId: candidate}).forEach(function(e) {
			score += parseFloat(e.total);
		});
		return score.toFixed(2);
	}
});