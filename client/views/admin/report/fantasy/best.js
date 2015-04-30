Template.bestInFantasy.onCreated(function() {
	this.subscribe('fantasys');
	this.subscribe('judges');
});

Template.bestInFantasy.helpers({
	best: function() {
		var fantasys = [];

		Fantasys.find().forEach(function(e) {
			var total = parseFloat(e.total);

			if(fantasys.length == 0) {
				fantasys.push({
					candidateId: e.candidateId,
					criteria1: e.criteria1,
					criteria2: e.criteria2,
					total: total.toFixed(2)
				});
			}
			else {
				var found = false;
				for(var i = 0; i < fantasys.length; i++) {
					if(fantasys[i].candidateId == e.candidateId) {
						fantasys[i].criteria1 = parseFloat(fantasys[i].criteria1) + parseFloat(e.criteria1);
						fantasys[i].criteria2 = parseFloat(fantasys[i].criteria2) + parseFloat(e.criteria2);
						fantasys[i].total = (parseFloat(fantasys[i].total) + parseFloat(total)).toFixed(2);
						found = true;
						break;
					}
				}

				if(!found) {
					fantasys.push({
						candidateId: e.candidateId,
						criteria1: e.criteria1,
						criteria2: e.criteria2,
						total: total.toFixed(2)
					});
				}
			}
		});
		
		var sortedFantasys = _.sortBy(fantasys, function(obj) {
			return parseFloat(obj.total);
		}).reverse();

		return _.first(sortedFantasys);
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