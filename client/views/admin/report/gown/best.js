Template.bestInGown.onCreated(function() {
	this.subscribe('gowns');
});

Template.bestInGown.helpers({
	best: function() {
		var gowns = [];

		Gowns.find().forEach(function(e) {
			var total = parseFloat(e.total);

			if(gowns.length == 0) {
				gowns.push({
					candidateId: e.candidateId,
					criteria1: e.criteria1,
					criteria2: e.criteria2,
					total: total.toFixed(2)
				});
			}
			else {
				var found = false;
				for(var i = 0; i < gowns.length; i++) {
					if(gowns[i].candidateId == e.candidateId) {
						gowns[i].criteria1 = parseFloat(gowns[i].criteria1) + parseFloat(e.criteria1);
						gowns[i].criteria2 = parseFloat(gowns[i].criteria2) + parseFloat(e.criteria2);
						gowns[i].total = (parseFloat(gowns[i].total) + parseFloat(total)).toFixed(2);
						found = true;
						break;
					}
				}

				if(!found) {
					gowns.push({
						candidateId: e.candidateId,
						criteria1: e.criteria1,
						criteria2: e.criteria2,
						total: total.toFixed(2)
					});
				}
			}
		});
		
		var sortedGowns = _.sortBy(gowns, function(obj) {
			return parseFloat(obj.total);
		}).reverse();

		return _.first(sortedGowns);
	},
	candidate: function(id) {
		var candidate = Candidates.findOne({_id: id});
		return candidate.number + '. ' + candidate.fname + ' ' + candidate.lname;
	}
});