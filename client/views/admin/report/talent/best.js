Template.bestInTalent.onCreated(function() {
	this.subscribe('talents');
});

Template.bestInTalent.helpers({
	best: function() {
		var talents = [];

		Talents.find().forEach(function(e) {
			var total = parseFloat(e.total);

			if(talents.length == 0) {
				talents.push({
					candidateId: e.candidateId,
					criteria1: e.criteria1,
					criteria2: e.criteria2,
					total: total.toFixed(2)
				});
			}
			else {
				var found = false;
				for(var i = 0; i < talents.length; i++) {
					if(talents[i].candidateId == e.candidateId) {
						talents[i].criteria1 = parseFloat(talents[i].criteria1) + parseFloat(e.criteria1);
						talents[i].criteria2 = parseFloat(talents[i].criteria2) + parseFloat(e.criteria2);
						talents[i].total = (parseFloat(talents[i].total) + parseFloat(total)).toFixed(2);
						found = true;
						break;
					}
				}

				if(!found) {
					talents.push({
						candidateId: e.candidateId,
						criteria1: e.criteria1,
						criteria2: e.criteria2,
						total: total.toFixed(2)
					});
				}
			}
		});
		
		var sortedTalents = _.sortBy(talents, function(obj) {
			return parseFloat(obj.total);
		}).reverse();

		return _.first(sortedTalents);
	},
	candidate: function(id) {
		var candidate = Candidates.findOne({_id: id});
		return candidate.number + '. ' + candidate.fname + ' ' + candidate.lname;
	}
});