Template.bestInPreliminary.onCreated(function() {
	this.subscribe('preliminaries');
	this.subscribe('judges');
});

Template.bestInPreliminary.helpers({
	best: function() {
		var preliminaries = [];

		Preliminaries.find().forEach(function(e) {
			var total = parseFloat(e.total);

			if(preliminaries.length == 0) {
				preliminaries.push({
					candidateId: e.candidateId,
					criteria1: e.criteria1,
					criteria2: e.criteria2,
					total: total.toFixed(2)
				});
			}
			else {
				var found = false;
				for(var i = 0; i < preliminaries.length; i++) {
					if(preliminaries[i].candidateId == e.candidateId) {
						preliminaries[i].criteria1 = parseFloat(preliminaries[i].criteria1) + parseFloat(e.criteria1);
						preliminaries[i].criteria2 = parseFloat(preliminaries[i].criteria2) + parseFloat(e.criteria2);
						preliminaries[i].total = (parseFloat(preliminaries[i].total) + parseFloat(total)).toFixed(2);
						found = true;
						break;
					}
				}

				if(!found) {
					preliminaries.push({
						candidateId: e.candidateId,
						criteria1: e.criteria1,
						criteria2: e.criteria2,
						total: total.toFixed(2)
					});
				}
			}
		});
		
		var sortedPreliminaries = _.sortBy(preliminaries, function(obj) {
			return parseFloat(obj.total);
		}).reverse();

		return _.first(sortedPreliminaries);
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