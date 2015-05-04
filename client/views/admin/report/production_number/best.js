Template.bestInProductionNumber.onCreated(function() {
	this.subscribe('productionNumbers');
	this.subscribe('judges');
});

Template.bestInProductionNumber.helpers({
	best: function() {
		var productionNumbers = [];

		ProductionNumbers.find().forEach(function(e) {
			var total = parseFloat(e.total);

			if(productionNumbers.length == 0) {
				productionNumbers.push({
					candidateId: e.candidateId,
					criteria1: e.criteria1,
					criteria2: e.criteria2,
					total: total.toFixed(2)
				});
			}
			else {
				var found = false;
				for(var i = 0; i < productionNumbers.length; i++) {
					if(productionNumbers[i].candidateId == e.candidateId) {
						productionNumbers[i].criteria1 = parseFloat(productionNumbers[i].criteria1) + parseFloat(e.criteria1);
						productionNumbers[i].criteria2 = parseFloat(productionNumbers[i].criteria2) + parseFloat(e.criteria2);
						productionNumbers[i].total = (parseFloat(productionNumbers[i].total) + parseFloat(total)).toFixed(2);
						found = true;
						break;
					}
				}

				if(!found) {
					productionNumbers.push({
						candidateId: e.candidateId,
						criteria1: e.criteria1,
						criteria2: e.criteria2,
						total: total.toFixed(2)
					});
				}
			}
		});
		
		var sortedProductionNumbers = _.sortBy(productionNumbers, function(obj) {
			return parseFloat(obj.total);
		}).reverse();

		return _.first(sortedProductionNumbers);
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