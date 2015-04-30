Template.bestInSwimwear.onCreated(function() {
	this.subscribe('swimwears');
	this.subscribe('judges');
});

Template.bestInSwimwear.helpers({
	best: function() {
		var swimwears = [];

		Swimwears.find().forEach(function(e) {
			var total = parseFloat(e.total);

			if(swimwears.length == 0) {
				swimwears.push({
					candidateId: e.candidateId,
					criteria1: e.criteria1,
					criteria2: e.criteria2,
					total: total.toFixed(2)
				});
			}
			else {
				var found = false;
				for(var i = 0; i < swimwears.length; i++) {
					if(swimwears[i].candidateId == e.candidateId) {
						swimwears[i].criteria1 = parseFloat(swimwears[i].criteria1) + parseFloat(e.criteria1);
						swimwears[i].criteria2 = parseFloat(swimwears[i].criteria2) + parseFloat(e.criteria2);
						swimwears[i].total = (parseFloat(swimwears[i].total) + parseFloat(total)).toFixed(2);
						found = true;
						break;
					}
				}

				if(!found) {
					swimwears.push({
						candidateId: e.candidateId,
						criteria1: e.criteria1,
						criteria2: e.criteria2,
						total: total.toFixed(2)
					});
				}
			}
		});
		
		var sortedSwimwears = _.sortBy(swimwears, function(obj) {
			return parseFloat(obj.total);
		}).reverse();

		return _.first(sortedSwimwears);
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