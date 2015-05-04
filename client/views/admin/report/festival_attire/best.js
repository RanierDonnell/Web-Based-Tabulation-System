Template.bestInFestivalAttire.onCreated(function() {
	this.subscribe('festivalAttires');
	this.subscribe('judges');
});

Template.bestInFestivalAttire.helpers({
	best: function() {
		var festivalAttires = [];

		FestivalAttires.find().forEach(function(e) {
			var total = parseFloat(e.total);

			if(festivalAttires.length == 0) {
				festivalAttires.push({
					candidateId: e.candidateId,
					criteria1: e.criteria1,
					criteria2: e.criteria2,
					total: total.toFixed(2)
				});
			}
			else {
				var found = false;
				for(var i = 0; i < festivalAttires.length; i++) {
					if(festivalAttires[i].candidateId == e.candidateId) {
						festivalAttires[i].criteria1 = parseFloat(festivalAttires[i].criteria1) + parseFloat(e.criteria1);
						festivalAttires[i].criteria2 = parseFloat(festivalAttires[i].criteria2) + parseFloat(e.criteria2);
						festivalAttires[i].total = (parseFloat(festivalAttires[i].total) + parseFloat(total)).toFixed(2);
						found = true;
						break;
					}
				}

				if(!found) {
					festivalAttires.push({
						candidateId: e.candidateId,
						criteria1: e.criteria1,
						criteria2: e.criteria2,
						total: total.toFixed(2)
					});
				}
			}
		});
		
		var sortedFestivalAttires = _.sortBy(festivalAttires, function(obj) {
			return parseFloat(obj.total);
		}).reverse();

		return _.first(sortedFestivalAttires);
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