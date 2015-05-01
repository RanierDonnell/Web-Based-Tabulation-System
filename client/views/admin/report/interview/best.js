Template.bestInInterview.onCreated(function() {
	this.subscribe('interviews');
	this.subscribe('judges');
});

Template.bestInInterview.helpers({
	best: function() {
		var interviews = [];

		Interviews.find().forEach(function(e) {
			var total = parseFloat(e.total);

			if(interviews.length == 0) {
				interviews.push({
					candidateId: e.candidateId,
					criteria1: e.criteria1,
					total: total.toFixed(2)
				});
			}
			else {
				var found = false;
				for(var i = 0; i < interviews.length; i++) {
					if(interviews[i].candidateId == e.candidateId) {
						interviews[i].criteria1 = parseFloat(interviews[i].criteria1) + parseFloat(e.criteria1);
						interviews[i].total = (parseFloat(interviews[i].total) + parseFloat(total)).toFixed(2);
						found = true;
						break;
					}
				}

				if(!found) {
					interviews.push({
						candidateId: e.candidateId,
						criteria1: e.criteria1,
						total: total.toFixed(2)
					});
				}
			}
		});
		
		var sortedInterviews = _.sortBy(interviews, function(obj) {
			return parseFloat(obj.total);
		}).reverse();

		return _.first(sortedInterviews);
	},
	candidate: function(id) {
		var candidate = Candidates.findOne({_id: id});
		return candidate.number + '. ' + candidate.fname + ' ' + candidate.lname;
	}
});