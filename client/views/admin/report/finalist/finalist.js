Template.finalistReport.onCreated(function() {
	this.subscribe('finalCandidate');
});

Template.finalistReport.helpers({
	candidates: function() {
		return Candidates.find();
	},
	fix: function(score) {
		return score.toFixed(2);
	}
});