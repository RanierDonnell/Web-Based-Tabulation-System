Template.bestInCasualInterview.onCreated(function() {
	this.subscribe('casualInterviews');
	this.subscribe('judges');
});

Template.bestInCasualInterview.helpers({
	best: function() {
		var casualInterviews = [];

		CasualInterviews.find().forEach(function(e) {
			var total = parseFloat(e.total);

			if(casualInterviews.length == 0) {
				casualInterviews.push({
					candidateId: e.candidateId,
					criteria1: e.criteria1,
					criteria2: e.criteria2,
					total: total.toFixed(2)
				});
			}
			else {
				var found = false;
				for(var i = 0; i < casualInterviews.length; i++) {
					if(casualInterviews[i].candidateId == e.candidateId) {
						casualInterviews[i].criteria1 = parseFloat(casualInterviews[i].criteria1) + parseFloat(e.criteria1);
						casualInterviews[i].criteria2 = parseFloat(casualInterviews[i].criteria2) + parseFloat(e.criteria2);
						casualInterviews[i].total = (parseFloat(casualInterviews[i].total) + parseFloat(total)).toFixed(2);
						found = true;
						break;
					}
				}

				if(!found) {
					casualInterviews.push({
						candidateId: e.candidateId,
						criteria1: e.criteria1,
						criteria2: e.criteria2,
						total: total.toFixed(2)
					});
				}
			}
		});
		
		var sortedCasualInterviews = _.sortBy(casualInterviews, function(obj) {
			return parseFloat(obj.total);
		}).reverse();

		return _.first(sortedCasualInterviews);
	},
	candidate: function(id) {
		var candidate = Candidates.findOne({_id: id});
		return candidate.number + '. ' + candidate.fname + ' ' + candidate.lname;
	},
	average: function(score) {
		var ave = 0;
		var judgeCount = Meteor.users.find({'profile.deleted': 0, 'profile.roles': {$in: ['judge']}}).count();
		ave = parseFloat(score) / parseFloat(judgeCount);
		return ave.toFixed(2);
	}
});