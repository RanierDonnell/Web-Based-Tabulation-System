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
		return score.toFixed(2);
	}
});