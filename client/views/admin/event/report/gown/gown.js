var counter = 0;

Template.gownTable.onCreated(function() {
	this.subscribe('gowns');
});

Template.gownTable.helpers({
	gowns: function() {
		var gowns = [];
		Gowns.find().forEach(function(e) {
			var total = parseFloat(e.total);

			if(gowns.length == 0) {
				gowns.push({
					candidateId: e.candidateId,
					criteria1: e.criteria1,
					criteria2: e.criteria2,
					criteria3: e.criteria3,
					total: total.toFixed(2)
				});
			}
			else {
				var found = false;
				for(var i = 0; i < gowns.length; i++) {
					if(gowns[i].candidateId == e.candidateId) {
						gowns[i].criteria1 = parseFloat(gowns[i].criteria1) + parseFloat(e.criteria1);
						gowns[i].criteria2 = parseFloat(gowns[i].criteria2) + parseFloat(e.criteria2);
						gowns[i].criteria3 = parseFloat(gowns[i].criteria3) + parseFloat(e.criteria3);
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
						criteria3: e.criteria3,
						total: total.toFixed(2)
					});
				}
			}
		});
		
		return _.sortBy(gowns, function(obj) {
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