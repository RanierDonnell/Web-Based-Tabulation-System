var counter = 0;

Template.finalistTable.onCreated(function() {
	this.subscribe('finalists');
	this.subscribe('judges');
});

Template.finalistTable.helpers({
	finalists: function() {
		var finalists = [];
		var judgesCount = Meteor.users.find({'profile.deleted': 0, 'profile.roles': {$in: ['judge']}}).count();

		Finalists.find().forEach(function(e) {
			var criteria1Ave = parseFloat(e.criteria1) / parseFloat(judgesCount);
			var criteria2Ave = parseFloat(e.criteria2) / parseFloat(judgesCount);
			var total = parseFloat(criteria1Ave + criteria2Ave);

			if(finalists.length == 0) {
				finalists.push({
					candidateId: e.candidateId,
					criteria1: e.criteria1,
					criteria2: e.criteria2,
					total: total.toFixed(2)
				});
			}
			else {
				var found = false;
				for(var i = 0; i < finalists.length; i++) {
					if(finalists[i].candidateId == e.candidateId) {
						finalists[i].criteria1 = parseFloat(finalists[i].criteria1) + parseFloat(e.criteria1);
						finalists[i].criteria2 = parseFloat(finalists[i].criteria2) + parseFloat(e.criteria2);
						finalists[i].total = (parseFloat(finalists[i].total) + parseFloat(total)).toFixed(2);
						found = true;
						break;
					}
				}

				if(!found) {
					finalists.push({
						candidateId: e.candidateId,
						criteria1: e.criteria1,
						criteria2: e.criteria2,
						total: total.toFixed(2)
					});
				}
			}
		});
		
		return _.sortBy(finalists, function(obj) {
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