Template.finaleeTable.onCreated(function() {
	this.subscribe('finalists');
});

Template.finaleeTable.helpers({
	candidates: function() {
		var candidate = [];
		Candidates.find().forEach(function(e) {
			var finalist = Finalists.findOne({candidateId: e._id, judgeId: Session.get('selectedJudgeId')});
			var criteria1 = parseFloat(finalist.criteria1).toFixed(2);
			var criteria2 = parseFloat(finalist.criteria2).toFixed(2);
			var total = parseFloat(finalist.total).toFixed(2);

			candidate.push({
				number: e.number,
				name: e.fname + ' ' + e.mname + ' ' + e.lname,
				criteria1: criteria1,
				criteria2: criteria2,
				total: total
			});

		});
		
		return _.sortBy(candidate, function(obj) {
			return parseFloat(obj.total);
		}).reverse();
	}
});