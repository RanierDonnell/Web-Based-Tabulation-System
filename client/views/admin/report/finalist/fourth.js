Template.fourthReport.onCreated(function() {
	this.subscribe('fourthRunnerUp');
	this.subscribe('judges');
});

Template.fourthReport.helpers({
	fourth: function() {
		var finalists = [];
		Finalists.find().forEach(function(e) {
			var total = parseFloat(e.total);

			if(finalists.length == 0) {
				finalists.push({
					candidateId: e.candidateId,
					criteria1: e.criteria1,
					criteria2: e.criteria2,
					total: parseFloat(total.toFixed(2))
				});
			}
			else {
				var found = false;
				for(var i = 0; i < finalists.length; i++) {
					if(finalists[i].candidateId == e.candidateId) {
						finalists[i].criteria1 = parseFloat(finalists[i].criteria1) + parseFloat(e.criteria1);
						finalists[i].criteria2 = parseFloat(finalists[i].criteria2) + parseFloat(e.criteria2);
						finalists[i].total = parseFloat((parseFloat(finalists[i].total) + parseFloat(total)).toFixed(2));
						found = true;
						break;
					}
				}

				if(!found) {
					finalists.push({
						candidateId: e.candidateId,
						criteria1: e.criteria1,
						criteria2: e.criteria2,
						total: parseFloat(total.toFixed(2))
					});
				}
			}
		});
		console.log(finalists);
		return _.sortBy(finalists, 'total')[0];
	},
	candidate: function(id) {
		var candidate = Candidates.findOne({_id: id});
		return candidate.number + '. ' + candidate.fname + ' ' + candidate.lname;
	},
	computeAverage: function(total) {
		var judgeCount = Meteor.users.find({'profile.deleted': 0, 'profile.roles': {$in: ['judge']}}).count();
		return (parseFloat(total) / parseFloat(judgeCount)).toFixed(2);
	}
});