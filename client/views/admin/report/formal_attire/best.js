Template.bestInFormalAttire.onCreated(function() {
	this.subscribe('formalAttires');
	this.subscribe('judges');
});

Template.bestInFormalAttire.helpers({
	best: function() {
		var formalAttires = [];

		FormalAttires.find().forEach(function(e) {
			var total = parseFloat(e.total);

			if(formalAttires.length == 0) {
				formalAttires.push({
					candidateId: e.candidateId,
					criteria1: e.criteria1,
					criteria2: e.criteria2,
					total: total.toFixed(2)
				});
			}
			else {
				var found = false;
				for(var i = 0; i < formalAttires.length; i++) {
					if(formalAttires[i].candidateId == e.candidateId) {
						formalAttires[i].criteria1 = parseFloat(formalAttires[i].criteria1) + parseFloat(e.criteria1);
						formalAttires[i].criteria2 = parseFloat(formalAttires[i].criteria2) + parseFloat(e.criteria2);
						formalAttires[i].total = (parseFloat(formalAttires[i].total) + parseFloat(total)).toFixed(2);
						found = true;
						break;
					}
				}

				if(!found) {
					formalAttires.push({
						candidateId: e.candidateId,
						criteria1: e.criteria1,
						criteria2: e.criteria2,
						total: total.toFixed(2)
					});
				}
			}
		});
		
		var sortedFormalAttires = _.sortBy(formalAttires, function(obj) {
			return parseFloat(obj.total);
		}).reverse();

		return _.first(sortedFormalAttires);
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