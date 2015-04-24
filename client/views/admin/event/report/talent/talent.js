var counter = 0;

Template.talentTable.onCreated(function() {
	this.subscribe('talents');
});

Template.talentTable.helpers({
	talents: function() {
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
		
		return _.sortBy(talents, function(obj) {
			return parseFloat(obj.total);
		}).reverse();
	},
	candidate: function(id) {
		var candidate = Candidates.findOne({_id: id});
		return candidate.fname + ' ' + candidate.mname + ' ' + candidate.lname;
	},
	candidateNumber: function(id) {
		return Candidates.findOne({_id: id}).number;
	},
	setCounter: function() {
		counter = 0;
	},
	getCount: function() {
		return ++counter;
	}
});