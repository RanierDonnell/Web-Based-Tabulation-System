var counter = 0;

Template.swimwearTable.onCreated(function() {
	this.subscribe('swimwears');
});

Template.swimwearTable.helpers({
	swimwears: function() {
		var swimwears = [];
		Swimwears.find().forEach(function(e) {
			var total = parseFloat(e.total);

			if(swimwears.length == 0) {
				swimwears.push({
					candidateId: e.candidateId,
					criteria1: e.criteria1,
					criteria2: e.criteria2,
					criteria3: e.criteria3,
					total: total.toFixed(2)
				});
			}
			else {
				var found = false;
				for(var i = 0; i < swimwears.length; i++) {
					if(swimwears[i].candidateId == e.candidateId) {
						swimwears[i].criteria1 = parseFloat(swimwears[i].criteria1) + parseFloat(e.criteria1);
						swimwears[i].criteria2 = parseFloat(swimwears[i].criteria2) + parseFloat(e.criteria2);
						swimwears[i].criteria3 = parseFloat(swimwears[i].criteria3) + parseFloat(e.criteria3);
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
						criteria3: e.criteria3,
						total: total.toFixed(2)
					});
				}
			}
		});
		
		return _.sortBy(swimwears, function(obj) {
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