var counter = 0;

Template.interviewTable.onCreated(function() {
	this.subscribe('interviews');
});

Template.interviewTable.helpers({
	interviews: function() {
		var interviews = [];
		Interviews.find().forEach(function(e) {
			var total = parseFloat(e.total);

			if(interviews.length == 0) {
				interviews.push({
					candidateId: e.candidateId,
					criteria1: e.criteria1,
					criteria2: e.criteria2,
					total: total.toFixed(2)
				});
			}
			else {
				var found = false;
				for(var i = 0; i < interviews.length; i++) {
					if(interviews[i].candidateId == e.candidateId) {
						interviews[i].criteria1 = parseFloat(interviews[i].criteria1) + parseFloat(e.criteria1);
						interviews[i].criteria2 = parseFloat(interviews[i].criteria2) + parseFloat(e.criteria2);
						interviews[i].total = (parseFloat(interviews[i].total) + parseFloat(total)).toFixed(2);
						found = true;
						break;
					}
				}

				if(!found) {
					interviews.push({
						candidateId: e.candidateId,
						criteria1: e.criteria1,
						criteria2: e.criteria2,
						total: total.toFixed(2)
					});
				}
			}
		});
		
		return _.sortBy(interviews, function(obj) {
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